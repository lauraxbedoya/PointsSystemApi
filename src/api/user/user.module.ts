import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UniqueFields } from './unique-fields.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])],
  providers: [UserService, UniqueFields],
  controllers: [UserController],
  exports: [UserService]
})
export class UsersModule { }