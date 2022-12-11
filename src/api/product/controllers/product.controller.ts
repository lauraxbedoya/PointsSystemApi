import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/api/user/auth/jwt-auth.guard';
import { Roles } from 'src/api/user/guards/roles.decorator';
import { RolesGuard } from 'src/api/user/guards/roles.guard';
import { UserRole } from 'src/api/user/user.enum';
import { CreateProductDto, UpdateProductDto } from '../product.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService
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
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() body: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
    return this.productService.create(body, file);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.SuperAdmin)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
    return this.productService.update(id, body)
  }
}
//hcer un for de tantas imagenes hayan