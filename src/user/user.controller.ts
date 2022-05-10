import { Controller, Post, Body, UseGuards, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {
    }

    // CREATE
    @Post('signup')
    async signup(@Body() signUpUserDto: SignUpUserDto) {
        return this.usersService.signup(signUpUserDto);
    }

    //READ
    @Post('signin')
    async signin(@Body() signInUserDto: SignInUserDto) {
        return this.usersService.signin(signInUserDto);
    }

    //UPDATE
    @UseGuards(JwtAuthGuard)
    @Patch('update')
    async update(@Body signInUserDto: SignInUserDto) {
    }
}
