import { UserCredits } from 'src/api/credits/entities/user_credits.entity';
import { Order } from 'src/api/orders/entities/order.entity';
import { Purchase } from 'src/api/purchases/entities/purchase.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from '../user.enum';

@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  phone: string | null;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string | null;

  @Column({ enum: UserRole, default: UserRole.Customer })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase;

  @OneToOne(() => UserCredits)
  credits: UserCredits

  @OneToMany(() => Order, (order) => order.createdBy)
  ordersCreated: Order[]
}