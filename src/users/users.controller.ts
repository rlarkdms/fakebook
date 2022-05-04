import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/signup-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signin (@Body() signUpUserDto: SignUpUserDto) {
     return this.usersService.signup(signUpUserDto)
  }
}
