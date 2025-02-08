import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create")
  async createUser(@Body() data: { name: string; email: string; password: string }) {
    return this.userService.createUser(data);
  }

  @Get("all")
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('single/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() updateData: { name?: string; email?: string; password?: string }) {
    return this.userService.updateUser(id, updateData);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
