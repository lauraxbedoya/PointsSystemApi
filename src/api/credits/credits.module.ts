import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCredits } from './entities/user_credits.entity';
import { UserCreditsService } from './services/credits.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCredits]),
  ],
  providers: [UserCreditsService],
  controllers: [],
  exports: [UserCreditsService]
})
export class OrderModule { }
