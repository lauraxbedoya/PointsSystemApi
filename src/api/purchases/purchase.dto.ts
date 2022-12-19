import { IsArray, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreatePurchaseDto {

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsOptional()
  boughtWithCredits: number;

  @IsArray()
  @IsOptional()
  orders: OrderDto[];
}

export class OrderDto {

  @IsNumber()
  @IsOptional()
  productId: number

  @IsNumber()
  @IsOptional()
  amount: number
}