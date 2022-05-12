import { Controller, Post, Body, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { SigninDto, SignupDto, UpdateDto } from 'src/user/dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {
    }

    // CREATE
    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return this.usersService.signup(signupDto);
    }

    //READ
    @Post('signin')
    async signin(@Body() signinDto: SigninDto) {
        return this.usersService.signin(signinDto);
    }

    //UPDATE
    @UseGuards(AuthGuard('jwt'))
    @Patch('update')
    async update(@Body() updateDto: UpdateDto) {

    }
}
