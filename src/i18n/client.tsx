"use client";

import i18next, { KeyPrefix, Namespace } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  UseTranslationOptions,
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import { cookieName, getOptions, languages } from "./settings";
import { loadResources } from "./helpers";

const runsOnServerSide = typeof window === "undefined";

//
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend(loadResources))
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(
  ns: Namespace,
  options?: UseTranslationOptions<KeyPrefix<Namespace>>
) {
  const path = usePathname();
  const locale = path.split("/")[1];
  const [cookies, setCookie] = useCookies([cookieName]);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  useEffect(() => {
    if (runsOnServerSide && locale && i18n.resolvedLanguage !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  useEffect(() => {
    if (activeLng === i18n.resolvedLanguage) return;
    setActiveLng(i18n.resolvedLanguage);
  }, [activeLng, i18n.resolvedLanguage]);

  useEffect(() => {
    if (!locale || i18n.resolvedLanguage === locale) return;
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  useEffect(() => {
    if (cookies.i18next === locale) return;
    setCookie(cookieName, locale, { path: "/" });
  }, [locale, cookies.i18next, setCookie]);

  return ret;
}
