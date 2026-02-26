export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  join_key: string;
}

export interface IRegisterSuccessful {
  id: string;
  email: string;
  name: string;
  status: string;
  message: string;
}

export interface ILoginSuccessful {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  platform_role: string;
  memberships: IMembership[];
}

export interface IMembership {
  org_id: string;
  org_name: string;
  org_role: string;
  status: string;
}
