import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/user/auth/auth.module';
import { User } from './api/user/entities/user.entity';
import { UsersModule } from './api/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './api/product/product.module';
import { Product } from './api/product/entities/product.entity';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ProductImage } from './api/product/entities/product_images.entity';
import { Purchases } from './api/purchases/entities/purchase.entity';
import { PurchaseModule } from './api/purchases/purchase.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  TypeOrmModule.forRootAsync({
    useFactory: async (config: ConfigService) => {

      return {
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [User, Product, ProductImage, Purchases],
        synchronize: true,
      }
    },
    inject: [ConfigService]
  }),
    UsersModule,
    AuthModule,
    ProductModule,
    PurchaseModule,
  ],
})
export class AppModule { }
