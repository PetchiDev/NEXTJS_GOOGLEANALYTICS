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
