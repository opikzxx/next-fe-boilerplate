import { routing } from "@/lib/i18n-routing";

type LanguageOption = {
  locale: (typeof routing.locales)[number];
  flag: string;
  labelKey: string;
};

const languageOptions: LanguageOption[] = [
  { locale: "id", flag: "🇮🇩", labelKey: "language_id" },
  { locale: "en", flag: "🇬🇧", labelKey: "language_en" },
];

function getLanguageOption(locale: string) {
  return languageOptions.find((option) => option.locale === locale);
}

export { getLanguageOption, languageOptions };
export type { LanguageOption };
