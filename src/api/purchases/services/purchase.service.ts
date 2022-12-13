import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/api/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Purchases } from '../entities/purchase.entity';
import { CreatePurchaseDto } from '../purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchases)
    private purchaseRepo: Repository<Purchases>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(body: CreatePurchaseDto) {
    const user = await this.userRepo.findOneBy({ id: body.userId });
    if (!user) {
      throw new NotFoundException("user not found");
    }
    return this.purchaseRepo.save(body)
  }
}
