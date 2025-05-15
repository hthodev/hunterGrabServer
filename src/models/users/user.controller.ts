import { Controller, Get, Post, Body, Query, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { responseEndpoint } from 'src/responses/endpoint';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/check-email')
  async create(@Query('email') email: string) {
    const user = await this.userService.userExist(email)
    console.log(user);
    
    return responseEndpoint({ data: { email: !!user?.email } })
  }
}
