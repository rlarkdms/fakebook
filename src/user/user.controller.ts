import { Body, Controller, Delete, Get, Headers, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { DeleteDto, SigninDto, SignupDto, UpdateDto } from 'src/user/dto/user.dto';

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
        private readonly jwtService: JwtService,
    ) {}

    @Get()
    async signin(@Body() signinDto: SigninDto) {
        return this.userService.signin(signinDto);
    }

    @Post()
    async signup(@Body() signupDto: SignupDto) {
        return this.userService.signup(signupDto);
    }

    // ONLY CAN CHANGE OWN INFORMATIONS
    @UseGuards(AuthGuard('jwt'))
    @Patch()
    async update(@Headers('Authorization') authorization: string, @Body() updateDto: UpdateDto) {
        const userInfo = await this.extractJwt(authorization)
        return this.userService.update(userInfo.id, updateDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    async delete(@Headers('Authorization') authorization: string, @Body() deleteDto: DeleteDto) {
        const userInfo = await this.extractJwt(authorization);
        return this.userService.delete(userInfo.id, deleteDto)
    }

    private async extractJwt(authorization: string) {
        const token = authorization.replace("Bearer ", "");
        const userInfo = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET })
        return JSON.parse(JSON.stringify(userInfo));
    }
}
