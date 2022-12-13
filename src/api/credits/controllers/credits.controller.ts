import { Body, Controller, Get, Param, ParseIntPipe, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/api/user/auth/jwt-auth.guard';
import { SetUserExistKeyName } from 'src/api/user/decorators/setUserExistKeyName.decorator';
import { UserData } from 'src/api/user/decorators/user.decorator';
import { User } from 'src/api/user/entities/user.entity';
import { Roles } from 'src/api/user/guards/roles.decorator';
import { RolesGuard } from 'src/api/user/guards/roles.guard';
import { UserExistGuard } from 'src/api/user/guards/user-exist.guard';
import { UserRole } from 'src/api/user/user.enum';
import { CreateUserCreditsDto } from '../credits.dto';
import { CreditsService } from '../services/credits.service';

@Controller('credits')
export class CreditsController {
  constructor(
    private creditsService: CreditsService
  ) { }

  // @Get()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.Staff, UserRole.Admin, UserRole.SuperAdmin)
  // findAll() {
  //   return this.creditsService.findAll();
  // }

  // @Get(':userId')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.Staff, UserRole.Admin, UserRole.SuperAdmin, UserRole.Customer)
  // findOne(@Param('userId', ParseIntPipe) userId: number, @UserData() user: User) {
  //   if (user.role === UserRole.Customer && user.id !== userId) {
  //     throw new UnauthorizedException();
  //   }
  //   return this.creditsService.findOne(userId)
  // }
}
