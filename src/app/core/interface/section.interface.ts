export interface ISection {
    name: string,
    join_code: string,
    course_id: string,
    id: string,
    class_id: string,
    is_active: boolean,
    created_at: string,
    updated_at: string
  }

export interface ICreateSection {
  name: string,
  join_code: string,
  course_id: string,
  class_id: string
}

export interface IUpdateSection {
  name: string,
  course_id: string,
  join_code: string,
}
