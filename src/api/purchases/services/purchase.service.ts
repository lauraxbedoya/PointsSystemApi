import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../entities/purchase.entity';
import { CreatePurchaseDto } from '../purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepo: Repository<Purchase>
  ) { }

  async create(body: CreatePurchaseDto) {
    const newPurchase = new Purchase;
    newPurchase.userId = body.userId;
    newPurchase.boughtWithCredits = body.boughtWithCredits;

    return this.purchaseRepo.save(newPurchase);
  }
}