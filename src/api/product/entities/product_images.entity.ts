import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('product_image')
export class ProductImage {

  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false })
  public imageId: string

  @Column()
  public productId: number

  @ManyToOne(() => Product, (product) => product.productImages)
  @JoinColumn({ name: 'productId' })
  product: Product

  @CreateDateColumn()
  createdAt: Date
}