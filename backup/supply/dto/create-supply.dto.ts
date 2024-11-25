import {
  IsNotEmpty,
  IsOptional, IsString, Length,
} from 'class-validator';

export class CreateSupplyDto {
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @IsNotEmpty()
  ownerName: string;

  @IsNotEmpty()
  @Length(5, 50)
  address: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @Length(5, 20)
  bankAccount: number;

  @IsNotEmpty()
  @Length(3, 20)
  bankName: string;

  @IsOptional()
  @Length(5)
  note: string;

  @IsOptional()
  isActive: boolean;
}
