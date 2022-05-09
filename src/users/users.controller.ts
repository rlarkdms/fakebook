import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup (@Body() signUpUserDto: SignUpUserDto) {
      return this.usersService.signup(signUpUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('signin')
  async signin(@Body() signInUserDto: SignInUserDto){
      return this.usersService.signin(signInUserDto);
  }
}
