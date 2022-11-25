import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) { }

  findAll() {
    return this.usersRepo.find();
  }

  findOne(id: number) {
    return this.usersRepo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.usersRepo.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepo.delete(id);
  }

  create(body: any) {
    return this.usersRepo.save(body);
  }

  async update(id: number, body: any) {
    const user = await this.usersRepo.findOneBy({ id });
    this.usersRepo.merge(user, body);
    return this.usersRepo.save(user);
  }
}