import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleDriveService } from 'src/googleDriveService';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductImage } from '../entities/product_images.entity';
import { CreateProductDto, UpdateProductDto } from '../product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
    @InjectRepository(ProductImage)
    private imgsProductRepo: Repository<ProductImage>,
    private gDriveService: GoogleDriveService,
    private configService: ConfigService,
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

  async create(body: CreateProductDto, file: Express.Multer.File) {
    const newProduct = await this.productsRepo.save(body);
    const productId = newProduct.id;
    const respImg = await this.gDriveService.saveFile(file, `product-${productId}`, this.configService.get('GOOGLE_NAME_FOLDER_PRODUCT'))

    const imageId = respImg.data.id;
    const product = await this.productsRepo.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException("stock not founded");
    }
    const newImage = new ProductImage();
    newImage.product = product;
    newImage.productId = productId;
    const resp = this.imgsProductRepo.save({ imageId, productId })
    return { resp, body }
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
