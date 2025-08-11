export * from "./banner";
export const feedBackUrl =
  process.env.NEXT_PUBLIC_FEEDBACK_URL ??
  "https://prod-27.northeurope.logic.azure.com:443/workflows/405f33f73c804aee99724a05edc4966c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=iXxQgnbSdVqmUwK4iSXQLf922PFRzne8giklD21M3YE";
