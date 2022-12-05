import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { GoogleDriveService } from 'src/googleDriveService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [ProductService, GoogleDriveService],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule { }
