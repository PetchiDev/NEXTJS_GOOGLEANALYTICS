const QL_ELS_URI = process.env.ELS_URI ?? "localhost:3000";
const QL_ELS_USERNAME = process.env.ELS_USERNAME ?? "username";
const QL_ELS_PASSWORD = process.env.ELS_PASSWORD ?? "password";

export const serverConfig = {
  ql_els_uri: QL_ELS_URI,
  ql_els_username: QL_ELS_USERNAME,
  ql_els_password: QL_ELS_PASSWORD,
};
