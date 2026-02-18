export interface ICreateClass {
  name: string;
  join_code: string;
  allow_join_requests: boolean;
  course_id: string;
  org_id: string;
}

export interface IClass {
  name: string;
  join_code: string;
  allow_join_requests: boolean;
  id: string;
  org_id: string;
  course_id: string;
  is_active: boolean;
  is_published: boolean;
  is_archived: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface IUpdateClass {
  name: string;
  course_id: string;
  is_published: boolean;
  is_archived: boolean;
  is_active: boolean;
}
