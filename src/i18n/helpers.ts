// Helper to load resources from both shared and app-specific folders

export const loadResources = (language: string, namespace: string) => {
  return import(`src/app/i18n/locales/${language}/${namespace}.json`)
    .then((module) => {
      return module.default;
    })
    .catch(() => {
      return import(`./locales/${language}/${namespace}.json`)
        .then((module) => module.default)
        .catch((err) => console.log("Common NS not found:", err));
    });
};
