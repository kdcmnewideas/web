export interface IBoardRequestBody {
  name: string;
  code: string;
  country: string;
  state: string;
}

export interface IBoard {
  name: string;
  code: string;
  country: string;
  state: string;
  id: string;
  is_active: boolean;
  description?: string;
}
