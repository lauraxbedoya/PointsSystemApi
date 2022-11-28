import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

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

  async create(body: any) {
    const saltOrRounds = 10;
    const password = body.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return this.usersRepo.save({ ...body, password: hash });
  }

  async update(id: number, body: any) {
    const user = await this.usersRepo.findOneBy({ id });
    this.usersRepo.merge(user, body);
    return this.usersRepo.save(user);
  }
}