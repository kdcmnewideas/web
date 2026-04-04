export interface ICourse {
  name: string;
  code: string;
  board_id: string;
  id: string;
  is_active: boolean;
}

export interface ICreateCourse {
  name: string
  code: string
  board_id: string
}

export interface IUpdateCourse {
  name: string
  is_active: boolean
}
