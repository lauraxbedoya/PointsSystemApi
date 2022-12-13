import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credits } from './entities/user_credits.entity';
import { CreditsService } from './services/credits.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Credits, User]),
  ],
  providers: [CreditsService],
  controllers: [],
  exports: [CreditsService]
})
export class OrderModule { }
