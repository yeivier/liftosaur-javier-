import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import { esCatalog } from "../src/i18n/es";

const TEXT_PROPS = new Set([
  "placeholder",
  "title",
  "label",
  "aria-label",
  "alt",
  "header",
  "buttonText",
  "emptyText",
  "subtitle",
  "description",
  "confirmText",
  "cancelText",
  "okText",
  "message",
  "headerTitle",
]);

// The JSX transform decodes these before the string reaches a component, so the catalog
// is keyed by the decoded form.
const entities: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&gt;": ">",
  "&lt;": "<",
  "&quot;": '"',
  "&apos;": "'",
  "&mdash;": "—",
  "&ndash;": "–",
  "&hellip;": "…",
};

function decodeEntities(text: string): string {
  return text.replace(/&[a-z]+;/g, (match) => entities[match] ?? match);
}

const skipDirs = new Set(["node_modules", "generated", "i18n"]);
const identifier = /^[a-z0-9]+(-[a-z0-9]+)+$/;
const numeric = /^[\d\s.,:%$+\-/()]+$/;
const url = /^(https?:|\/|\.\/|#|data:|mailto:)/;

function collectFiles(dir: string, out: string[]): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) {
        collectFiles(full, out);
      }
    } else if (full.endsWith(".tsx")) {
      out.push(full);
    }
  }
  return out;
}

function isTranslatable(text: string): boolean {
  return (
    text.length > 1 &&
    text.length <= 600 &&
    /[A-Za-z]{2}/.test(text) &&
    !identifier.test(text) &&
    !numeric.test(text) &&
    !url.test(text)
  );
}

function collectStrings(file: string): string[] {
  const source = fs.readFileSync(file, "utf8");
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isJsxText(node)) {
      found.push(decodeEntities(node.text.replace(/\s+/g, " ").trim()));
    } else if (ts.isJsxAttribute(node) && node.initializer && TEXT_PROPS.has(node.name.getText())) {
      const init = node.initializer;
      if (ts.isStringLiteral(init)) {
        found.push(init.text);
      } else if (ts.isJsxExpression(init) && init.expression && ts.isStringLiteral(init.expression)) {
        found.push(init.expression.text);
      }
    } else if (
      ts.isCallExpression(node) &&
      node.expression.getText() === "Translate_text" &&
      node.arguments.length === 1 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      found.push((node.arguments[0] as ts.StringLiteral).text.trim());
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return found.filter(isTranslatable);
}

const files = collectFiles("src", []);
const seen = new Map<string, string[]>();
for (const file of files) {
  for (const text of collectStrings(file)) {
    const sources = seen.get(text) ?? [];
    if (!sources.includes(file)) {
      sources.push(file);
    }
    seen.set(text, sources);
  }
}

const missing = [...seen.entries()].filter(([text]) => esCatalog[text] == null);
const covered = seen.size - missing.length;
const percent = seen.size === 0 ? 100 : Math.round((covered / seen.size) * 1000) / 10;

console.log(`catalog entries: ${Object.keys(esCatalog).length}`);
console.log(`ui strings: ${seen.size}`);
console.log(`translated: ${covered} (${percent}%)`);

if (process.argv.includes("--list")) {
  for (const [text, sources] of missing.sort((a, b) => b[1].length - a[1].length)) {
    console.log(`${sources.length}\t${JSON.stringify(text)}\t${sources[0]}`);
  }
}
