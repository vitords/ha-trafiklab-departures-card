import { en, Translations } from "./en";
import { sv } from "./sv";

const LOCALES: Record<string, Translations> = { en, sv };

/** Returns the translation bundle for the given HA language code (e.g. "sv", "sv-SE", "en"). */
export function getLocale(language: string): Translations {
  const lang = language?.split("-")[0]?.toLowerCase() ?? "en";
  return LOCALES[lang] ?? en;
}
