import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getUsers() {
    const res = await this.userService.getUsers();
    return {
      res,
    };
  }

  @Post('register')
  async registerUser(@Body() dto: UserRegisterDto) {
    console.log(dto);
    const id = await this.userService.registerUser(dto);
    return {
      id,
    };
  }
}
