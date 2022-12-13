import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreatePurchaseDto {

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsOptional()
  boughtWithCredits: number;
}

//order: Order[] => vaya guardando producto y cantidad dto
//todo va en purchase (controllers) 
//created by esta en el request
//creits given creditsgiven de este producto pr el amount
// price = product.price * amount
//dto id del producto y el amoint, hay que ir por ese producto