import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  creditsToGive: number;

  @IsNumber()
  @IsNotEmpty()
  creditsToBuy: number;
}

export class UpdateProductDto {

  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  creditsToGive: number;

  @IsNumber()
  @IsOptional()
  creditsToBuy: number;
}