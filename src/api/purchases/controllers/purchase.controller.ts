import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/api/user/auth/jwt-auth.guard';
import { PurchaseService } from 'src/api/purchases/services/purchase.service';
import { SetUserExistKeyName } from 'src/api/user/decorators/setUserExistKeyName.decorator';
import { Roles } from 'src/api/user/guards/roles.decorator';
import { RolesGuard } from 'src/api/user/guards/roles.guard';
import { UserRole } from 'src/api/user/user.enum';
import { CreatePurchaseDto } from '../purchase.dto';
import { UserExistGuard } from 'src/api/user/guards/user-exist.guard';
import { OrderService } from 'src/api/orders/services/order.service';
import { UserData } from 'src/api/user/decorators/user.decorator';
import { User } from 'src/api/user/entities/user.entity';
import { UserCreditsService } from 'src/api/credits/services/credits.service';

@Controller('purchase')
export class PurchaseController {
  constructor(
    private purchaseService: PurchaseService,
    private orderService: OrderService,
    private userCreditsService: UserCreditsService
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, UserExistGuard)
  @Roles(UserRole.Staff, UserRole.Admin, UserRole.SuperAdmin, UserRole.Customer)
  @SetUserExistKeyName('userId')
  async create(@Body() body: CreatePurchaseDto, @UserData() user: User) {
    const purchase = await this.purchaseService.create(body);

    const creditsToGive = await this.orderService.create(body.orders, Boolean(body.boughtWithCredits), purchase.id, user.id);

    const userCredits = await this.userCreditsService.assignCredits(creditsToGive, body.userId, body.boughtWithCredits);

    console.log({ purchase, creditsToGive, userCredits });
  }
}

