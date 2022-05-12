import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { SigninDto, SignupDto, UpdateDto } from 'src/user/dto/user.dto';

/* RESTful API
 * @Get: signin
 * @Post: signup
 * @Patch: user information update
 * @Delete: user delete
 * */
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    //signin
    @Get()
    async signin(@Body() signinDto: SigninDto) {
        return this.userService.signin(signinDto);
    }

    //signup
    @Post()
    async signup(@Body() signupDto: SignupDto) {
        return this.userService.signup(signupDto);
    }

    //Update user information
    @UseGuards(AuthGuard('jwt'))
    @Patch()
    async update(@Body() updateDto: UpdateDto) {
        return this.userService.update(updateDto);
    }
}
