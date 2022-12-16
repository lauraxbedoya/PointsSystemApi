import { Product } from "src/api/product/entities/product.entity";
import { Purchase } from "src/api/purchases/entities/purchase.entity";
import { User } from "src/api/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Order {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  productId: number

  @ManyToOne(() => Product, (product) => product.orders)
  @JoinColumn({ name: 'productId' })
  product: Product

  @Column()
  purchaseId: number

  @ManyToOne(() => Purchase, (purchase) => purchase.orders)
  @JoinColumn({ name: 'purchaseId' })
  purchase: Purchase

  @Column()
  amount: number

  @Column({ type: 'money' })
  price: number

  @Column({ type: 'integer' })
  creditsGiven: number

  @CreateDateColumn()
  createdAt: Date

  @Column()
  createdById: number

  @ManyToOne(() => User, (user) => user.ordersCreated)
  @JoinColumn({ name: 'createdById' })
  createdBy: User
}