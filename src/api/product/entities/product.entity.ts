import { Order } from "src/api/orders/entities/order.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductImage } from "./product_images.entity";

@Entity('products')
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'integer' })
  price: number

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'integer' })
  creditsToGive: number

  @Column({ type: 'integer' })
  creditsToBuy: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => ProductImage, (image) => image.product)
  productImages: ProductImage[]

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[]
}
