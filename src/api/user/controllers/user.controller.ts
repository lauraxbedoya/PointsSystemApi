import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id)
  }

  @Get()
  findByEmail(@Body() email: string) {
    return this.userService.findByEmail(email)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id)
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body)
  }
}
