export interface ICreateOrg {
  name: string;
  org_type: string;
  tenant_code: string;
  admin_email: string;
  admin_name: string;
}

export interface IOrganization {
  name: string;
  org_type: string;
  tenant_code: string;
  id: string;
  join_mode: string;
  created_at: string;
}

export interface IUpdateOrg {
  name: string;
  default_settings: Record<any, any>;
}

export interface IAddMenber {
  email: string;
  role: string;
  name: string;
}

export interface IMember {
  id: string;
  user_id: string;
  org_role: string;
  status: string;
  user_email: string;
}

export interface IUpdateMember {
  role: string;
  status: string;
}

export interface IBulkUpdateResponse {
  total_processed: number;
  success_count: number;
  error_count: number;
  errors: any[];
}

export interface IRotateKey {
  join_key: string;
  expires_at: string;
}

export interface IAcceptInvite {
  token: string;
  password: string;
  name: string;
}
