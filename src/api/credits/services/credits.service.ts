import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCreditsDto } from '../credits.dto';
import { Credits } from '../entities/user_credits.entity';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(Credits)
    private creditsRepo: Repository<Credits>
  ) { }

  async create(newUserCredits: CreateUserCreditsDto) {
    const userCredits = await this.creditsRepo.findOneBy({ userId: newUserCredits.userId });
    if (!userCredits) {
      this.creditsRepo.save(newUserCredits)
    } else {
      userCredits.credits += newUserCredits.credits;
      return this.creditsRepo.save(userCredits)
    }
    return userCredits
  }
}
