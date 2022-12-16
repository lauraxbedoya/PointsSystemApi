import { Transform, TransformFnParams, Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateOrderDto {

  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  amount: number;

  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  price: number;

  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  creditsGiven: number;
}