export type LanguageData = {
  code: string;
  label: string;
  change: (url: URL) => string;
};
