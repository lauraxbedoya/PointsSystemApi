import { IsNotEmpty, IsEnum, IsNumberString, ValidateIf, NotEquals, IsOptional, IsEmail, IsString, MinLength } from 'class-validator';
import { UserRole } from './user.enum';

export class UpdateUserDto {

  @IsString()
  @MinLength(3)
  @ValidateIf((object, value) => value !== undefined)
  name: string;

  @IsString({ message: 'debe ser string' })
  @IsEmail()
  @ValidateIf((object, value) => value !== undefined)
  @NotEquals(null)
  @IsNotEmpty()
  email: string;

  @IsNumberString()
  @MinLength(5)
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  password: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsEnum(UserRole)
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  role: UserRole;
}


export class CreateUserDto {

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumberString()
  @MinLength(5)
  @IsOptional()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}