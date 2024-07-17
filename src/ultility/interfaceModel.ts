import { IsNotEmpty, Length } from 'class-validator';

export interface IResponse<T> {
  statusCode: number;
  message: string;
  total: number;
  data: T[]
}

export class FindOneParams {
  @IsNotEmpty()
  @Length(24, 24)
  id: string;
}