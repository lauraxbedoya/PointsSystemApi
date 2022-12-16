import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchaseController } from './controllers/purchase.controller';
import { User } from '../user/entities/user.entity';
import { PurchaseService } from './services/purchase.service';
import { UserCreditsService } from '../credits/services/credits.service';
import { UserCredits } from '../credits/entities/user_credits.entity';
import { Product } from '../product/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderService } from '../orders/services/order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, User, UserCredits, Product, Order]),
  ],
  providers: [PurchaseService, UserCreditsService, OrderService],
  controllers: [PurchaseController],
  exports: [PurchaseService]
})
export class PurchaseModule { }
