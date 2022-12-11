import { IsOptional } from "class-validator";
import { User } from "src/api/user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('purchases')
export class Purchases extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.purchases)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  @IsOptional()
  boughtWithCredits: number | null;

  @CreateDateColumn()
  createdAt: Date;
}