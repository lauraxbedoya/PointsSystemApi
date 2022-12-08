import { Transform, TransformFnParams, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @IsNotEmpty()
  creditsToGive: number;

  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => parseInt(value))
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