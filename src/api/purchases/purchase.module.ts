import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchases } from './entities/purchase.entity';
import { PurchaseController } from './controllers/purchase.controller';
import { User } from '../user/entities/user.entity';
import { PurchaseService } from './services/purchase.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchases, User]),
  ],
  providers: [PurchaseService],
  controllers: [PurchaseController],
  exports: [PurchaseService]
})
export class PurchaseModule { }
