import { config } from "../../constants";

const enum MENU_KEYS {
  ADVERTISING_TERMS = `advertising_terms`,
  REFUND_POLICY = `refund_policy`,
  WEBSITE_TERMS = `website_terms`,
  RULES_FOR_POSTING_AD = `rules_for_posting_ad`,
  CONTACT_US = `contact_us`,
}
export const TERMS_AND_CONDITIONS_LINKS = [
  {
    key: `${MENU_KEYS.ADVERTISING_TERMS}`,
    url: `${config.ql_url}/advertisingterms`,
    submenu: [],
  },
  {
    key: `${MENU_KEYS.REFUND_POLICY}`,
    url: `${config.ql_url}/refund-policy`,
    submenu: [],
  },
  {
    key: `${MENU_KEYS.WEBSITE_TERMS}`,
    url: `${config.ql_url}/terms-of-use`,
    submenu: [],
  },
  {
    key: `${MENU_KEYS.RULES_FOR_POSTING_AD}`,
    url: `${config.ql_url}/rules-advertising`,
    submenu: [],
  },
  {
    key: `${MENU_KEYS.CONTACT_US}`,
    url: `${config.ql_url}/contact`,
    submenu: [],
  },
];
