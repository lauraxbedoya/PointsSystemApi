import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchases } from './entities/purchase.entity';
import { PurchaseController } from './controllers/purchase.controller';
import { User } from '../user/entities/user.entity';
import { PurchaseService } from './services/purchase.service';
import { CreditsService } from '../credits/services/credits.service';
import { Credits } from '../credits/entities/user_credits.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchases, User, Credits]),
  ],
  providers: [PurchaseService, CreditsService],
  controllers: [PurchaseController],
  exports: [PurchaseService, CreditsService]
})
export class PurchaseModule { }
