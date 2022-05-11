import { Controller, Post, Body, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { SignupDto } from 'src/user/dto/signup.dto';
import { SigninDto } from 'src/user/dto/signin.dto';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {
    }

    // CREATE
    @Post('signup')
    async signup(@Body() signUpUserDto: SignupDto) {
        return this.usersService.signup(signUpUserDto);
    }

    //READ
    @Post('signin')
    async signin(@Body() signInUserDto: SigninDto) {
        return this.usersService.signin(signInUserDto);
    }

    //UPDATE
    @UseGuards(AuthGuard('jwt'))
    @Patch('update')
    async update(@Body() signInUserDto: SigninDto) {
    }
}
