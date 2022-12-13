import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserCreditsDto {

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  credits: number;
}