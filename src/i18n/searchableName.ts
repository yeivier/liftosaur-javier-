import { Translate_text } from "./translate";

export function Translate_searchableName(name: string): string {
  const lower = name.toLowerCase();
  const translated = Translate_text(name).toLowerCase();
  return translated === lower ? lower : `${lower} ${translated}`;
}
