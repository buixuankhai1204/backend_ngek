import {
  IsNotEmpty,
  IsOptional, IsString, Length,
} from 'class-validator';
export class CreateSupplyDto {
  @IsNotEmpty()
  @Length(5, 50)
  name: string

  @IsNotEmpty()
  @Length(5, 50)
  address: string

  @IsString()
  phoneNumber: string

  @IsOptional()
  bankAccount: string

  @IsOptional()
  bankName: string
}
