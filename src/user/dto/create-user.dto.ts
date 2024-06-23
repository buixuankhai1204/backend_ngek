import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5, { message: 'username can not create with length less than 5' })
  @MaxLength(30, {
    message: 'username can not create with length greater than 30',
  })
  username: string;

  @IsNotEmpty()
  @MinLength(5, { message: 'username can not create with length less than 5' })
  @MaxLength(30, {
    message: 'username can not create with length greater than 30',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsNumber()
  age: string;

  @IsOptional()
  roles: string;
}

export class FindOneParams {
  @IsNumberString()
  id: number;
}
