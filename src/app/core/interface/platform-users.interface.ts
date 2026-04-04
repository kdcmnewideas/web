export interface IPlatformUser {
  id: string;
  email: string;
  name: string;
  status: string;
  platform_role: string;
  created_at: string;
}

export interface ICreateUser {
  email: string;
  name: string;
  password: string;
  platform_role: string;
  status: string;
}
