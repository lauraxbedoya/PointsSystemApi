import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/api/user/auth/jwt-auth.guard';
import { Roles } from 'src/api/user/guards/roles.decorator';
import { RolesGuard } from 'src/api/user/guards/roles.guard';
import { UserRole } from 'src/api/user/user.enum';
import { GoogleDriveService } from 'src/googleDriveService';
import { CreateProductDto, UpdateProductDto } from '../product.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private gDriveService: GoogleDriveService,
    private configService: ConfigService,
  ) { }

  @Get()
  findAll() {
    return this.productService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.SuperAdmin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.SuperAdmin)
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.SuperAdmin)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
    return this.productService.update(id, body)
  }

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) {
    const resp = await this.gDriveService.saveFile(file, `product-${id}`, this.configService.get('GOOGLE_NAME_FOLDER_PRODUCT'))
    return resp;
  }
}