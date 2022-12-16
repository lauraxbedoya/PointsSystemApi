import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCredits } from '../entities/user_credits.entity';

@Injectable()
export class UserCreditsService {
  constructor(
    @InjectRepository(UserCredits)
    private creditsRepo: Repository<UserCredits>
  ) { }

  async assignCredits(newUserCredits: number[], userId: number, boughtWithCredits: number) {
    const userCredits = await this.creditsRepo.findOneBy({ userId });

    const totalCredits = newUserCredits.reduce((prev, curr) => prev + curr, 0);

    if (!userCredits) {
      return this.creditsRepo.save({
        userId,
        credits: totalCredits
      })
    } else {
      userCredits.credits = !boughtWithCredits ? userCredits.credits + totalCredits : userCredits.credits - boughtWithCredits;
      return this.creditsRepo.save(userCredits)
    }
  }
}
