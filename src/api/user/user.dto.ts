import { IsNotEmpty, IsEnum, IsNumberString, ValidateIf, NotEquals, IsOptional, IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { UniqueFields } from './unique-fields.guard';
import { UserRole } from './user.enum';

export class UpdateUserDto {

  @IsString()
  @MinLength(3)
  @ValidateIf((object, value) => value !== undefined)
  name: string;

  @IsString({ message: 'Debe ser string' })
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
  @Validate(UniqueFields, ['email'])
  email: string;

  @IsNumberString()
  @MinLength(5)
  @IsOptional()
  @Validate(UniqueFields, ['phone'])
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsEnum(UserRole)
  @IsOptional()
  @IsNotEmpty()
  role: UserRole;
}