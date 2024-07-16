export interface IResponse<T> {
  statusCode: number;
  message: string;
  total: number;
  data: T[]
}