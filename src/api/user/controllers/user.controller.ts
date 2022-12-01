import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../guards/roles.decorator';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../user.dto';
import { UserRole } from '../user.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserData } from '../decorators/user.decorator';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Staff, UserRole.Admin, UserRole.SuperAdmin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Customer, UserRole.Admin, UserRole.SuperAdmin, UserRole.Staff)
  findOne(@Param('id', ParseIntPipe) id: number, @UserData() user: User) {
    if (user.role === UserRole.Customer && user.id !== id) {
      throw new UnauthorizedException();
    }
    return this.userService.findOne(id)
  }

  @Post('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.SuperAdmin)
  createUserAdmin(@Body() body: CreateUserDto) {
    return this.userService.createUserAdmin(body);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create({ ...body, role: UserRole.Customer });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Customer, UserRole.Admin, UserRole.SuperAdmin)
  remove(@Param('id', ParseIntPipe) id: number, @UserData() user: User) {
    if (user.role === UserRole.Customer && user.id !== id) {
      throw new UnauthorizedException();
    }
    return this.userService.remove(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Customer, UserRole.Admin, UserRole.SuperAdmin)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto, @UserData() user: User) {
    if (user.role === UserRole.Customer && user.id !== id) {
      throw new UnauthorizedException();
    }
    return this.userService.update(id, body)
  }
}
