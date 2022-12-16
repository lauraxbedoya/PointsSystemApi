import { IsOptional } from "class-validator";
import { Order } from "src/api/orders/entities/order.entity";
import { User } from "src/api/user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('purchases')
export class Purchase extends BaseEntity {

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

  @OneToMany(() => Order, (order) => order.purchase)
  orders: Order[]
}