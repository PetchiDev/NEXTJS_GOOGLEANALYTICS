import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { fallbackLng, getOptions } from "./settings";
import { loadResources } from "./helpers";

const initI18next = async (lng?: string, ns?: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend(loadResources))
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function asyncUseTranslation(ns: string) {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const lng = cookieStore.get("i18next")?.value || fallbackLng;
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nextInstance,
  };
}
