import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePurchaseDto {

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  boughtWithCredits: number;
}