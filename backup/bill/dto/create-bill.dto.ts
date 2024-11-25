import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  supplyId: string

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number

  @IsOptional()
  @IsBoolean()
  isPay: boolean

  @IsOptional()
  @IsBoolean()
  isDelivered: boolean

  @IsOptional()
  @IsString()
  note: string
}

