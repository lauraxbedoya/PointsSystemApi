import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/api/product/entities/product.entity';
import { OrderDto } from 'src/api/purchases/purchase.dto';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepo: Repository<Order>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>
  ) { }

  async create(orders: OrderDto[], isBoughtWithCredits: boolean, purchaseId: number, userId: number): Promise<Order[]> {
    const newOrders = [];

    for (const order of orders) {
      const product = await this.productRepo.findOneBy({ id: order.productId });
      const newOrder = new Order();
      newOrder.productId = order.productId;
      newOrder.amount = order.amount;
      newOrder.price = +product.price * newOrder.amount;
      newOrder.creditsGiven = isBoughtWithCredits ? 0 : +product.creditsToGive * newOrder.amount;
      newOrder.purchaseId = purchaseId;
      newOrder.createdById = userId;
      const orderCreated = await this.ordersRepo.save(newOrder);
      if (orderCreated.creditsGiven > 0) {
        newOrders.push(orderCreated);
      }
    }
    return newOrders;
  }
}