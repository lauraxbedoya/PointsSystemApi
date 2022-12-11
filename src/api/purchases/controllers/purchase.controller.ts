import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/api/user/auth/jwt-auth.guard';
import { PurchaseService } from 'src/api/purchases/services/purchase.service';
import { SetUserExistKeyName } from 'src/api/user/decorators/setUserExistKeyName.decorator';
import { Roles } from 'src/api/user/guards/roles.decorator';
import { RolesGuard } from 'src/api/user/guards/roles.guard';
import { UserRole } from 'src/api/user/user.enum';
import { CreatePurchaseDto } from '../purchase.dto';
import { UserExistGuard } from 'src/api/user/guards/user-exist.guard';

@Controller('purchase')
export class PurchaseController {
  constructor(
    private purchaseService: PurchaseService
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, UserExistGuard)
  @Roles(UserRole.Staff, UserRole.Admin, UserRole.SuperAdmin)
  @SetUserExistKeyName('userId')
  create(@Body() body: CreatePurchaseDto) {
    return this.purchaseService.create(body)
  }
}
//crear un guard para la validacion de si existe un usuario, mirar si en el body o params esta el usuario


