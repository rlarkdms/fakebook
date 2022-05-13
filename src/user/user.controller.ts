import { Body, Controller, Get, Headers, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SigninDto, SignupDto, UpdateDto } from 'src/user/dto/user.dto';

/* RESTful API
 * @Get: signin
 * @Post: signup
 * @Patch: user information update
 * @Delete: user delete
 * */
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

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
    // ONLY CAN CHANGE OWN SETTINGS
    @UseGuards(AuthGuard('jwt'))
    @Patch()
    async update(@Headers('Authorization') authorization = '', @Body() updateDto: UpdateDto) {
        const token: object = await this.jwtService.verifyAsync(authorization.replace("Bearer ", ""), { secret: process.env.JWT_SECRET })
        return this.userService.update(JSON.parse(JSON.stringify(token)).id, updateDto);
    }
}
