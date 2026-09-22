import { esCatalog } from "./es";

export type ILocale = "en" | "es";

export const defaultLocale: ILocale = "es";

const catalogs: Record<ILocale, Readonly<Record<string, string>>> = {
  en: {},
  es: esCatalog,
};

const surroundingSpace = /^(\s*)([\s\S]*?)(\s*)$/;
const hasLetters = /[A-Za-z]{2}/;

let locale: ILocale = defaultLocale;
let missing: Set<string> | undefined;

export function Translate_setLocale(next: ILocale): void {
  locale = next;
}

export function Translate_locale(): ILocale {
  return locale;
}

export function Translate_startCollectingMissing(): void {
  missing = new Set();
}

export function Translate_missing(): string[] {
  return missing == null ? [] : Array.from(missing).sort();
}

export function Translate_text(text: string): string {
  if (locale === "en" || text.length === 0) {
    return text;
  }
  const catalog = catalogs[locale];
  const direct = catalog[text];
  if (direct != null) {
    return direct;
  }
  const parts = surroundingSpace.exec(text);
  if (parts == null || parts[2].length === 0) {
    return text;
  }
  const hit = catalog[parts[2]];
  if (hit == null) {
    if (missing != null && hasLetters.test(parts[2])) {
      missing.add(parts[2]);
    }
    return text;
  }
  return `${parts[1]}${hit}${parts[3]}`;
}

export function Translate_maybe(text: string | undefined): string | undefined {
  return text == null ? text : Translate_text(text);
}
