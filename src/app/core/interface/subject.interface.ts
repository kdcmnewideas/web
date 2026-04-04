export interface ICreateSubject {
  title: string
  description: string
  thumbnail_url: string
  org_id: string
}

export interface IUpdateSubject {
  title: string
  description: string
  thumbnail_url: string
}

export interface ISubjectDetails{
  title: string
  description: string
  thumbnail_url: string
  org_id: string
  id: string
  created_at: string
}
