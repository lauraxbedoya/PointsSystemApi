import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/api/orders/entities/order.entity';
import { Product } from 'src/api/product/entities/product.entity';
import { OrderDto } from 'src/api/purchases/purchase.dto';
import { Repository } from 'typeorm';
import { UserCredits } from '../entities/user_credits.entity';

@Injectable()
export class UserCreditsService {
  constructor(
    @InjectRepository(UserCredits)
    private creditsRepo: Repository<UserCredits>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>
  ) { }

  async assignCredits(orders: Order[], userId: number, boughtWithCredits: number) {
    const userCredits = await this.creditsRepo.findOneBy({ userId });

    const totalCredits = orders.reduce((prev, curr) => prev + curr., 0);

    if (!userCredits) {
      return this.creditsRepo.save({
        userId,
        credits: totalCredits
      })
    } else {
      userCredits.credits = !boughtWithCredits ? userCredits.credits + totalCredits : userCredits.credits - boughtWithCredits;
      return this.creditsRepo.save(userCredits)
    }
  }

  async haveUserEnoughCreditsToBuy(orders: OrderDto[], userId: number) {
    const userCredits = await this.creditsRepo.findOneBy({ userId });

    let totalCredits = 0;

    for (const order of orders) {
      const product = await this.productRepo.findOneBy({ id: order.productId });
      totalCredits += product.creditsToBuy * order.amount;
    }
    if (totalCredits > userCredits.credits) {
      return false;
    }
    return true;
  }
}
