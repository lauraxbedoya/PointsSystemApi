import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'money' })
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
}
