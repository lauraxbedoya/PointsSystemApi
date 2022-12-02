import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>
  ) { }

  findAll() {
    return this.productsRepo.find();
  }

  findOne(id: number) {
    return this.productsRepo.findOneBy({ id })
  }

  remove(id: number) {
    const productDeleted = this.productsRepo.delete(id)
    return { message: 'El producto ha sido elimado correctamente', productDeleted }
  }

  create(body: CreateProductDto) {
    return this.productsRepo.save(body)
  }

  async update(id: number, body: UpdateProductDto) {
    const currentProduct = await this.productsRepo.findOneBy({ id });

    Object.keys(body).forEach(key => {
      if (body[key] !== undefined && body[key] !== currentProduct[key]) {
        currentProduct[key] = body[key];
      }
    });
    return this.productsRepo.save(currentProduct)
  }
}
