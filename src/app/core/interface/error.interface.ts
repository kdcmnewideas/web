interface IDetails {
  loc: (number | string)[];
  msg: string;
  type: string;
}
export interface IValidationError {
  detail: IDetails[];
}
