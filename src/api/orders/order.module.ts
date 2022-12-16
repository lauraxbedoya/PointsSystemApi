import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product]),
  ],
  providers: [OrderService],
  controllers: [],
  exports: [OrderService]
})
export class OrderModule { }
