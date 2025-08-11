import { jwtDecode } from "jwt-decode";
import { useToken } from "./use-token";

// Define the structure of the decoded token
interface DecodedToken {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  user: {
    access: string;
    alias: string;
    created: string;
    email: string;
    image: string;
    init: string;
    is_admin: boolean;
    language: string;
    login: number;
    name: string;
    path: string;
    permissions: string[];
    phone: string;
    qlnext_user_id: string;
    roles: string[];
    showroom_info: unknown[]; //TODO required types
    status: string;
    subscription: unknown; //TODO required types
    timezone: string | null;
    uid: string;
  };
}

export function useDecodeToken() {
  const token = useToken();

  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const { qlnext_user_id, email, alias, status, uid, image, name, phone } =
      decoded.user;
    return { qlnext_user_id, email, alias, status, uid, image, name, phone };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
