import { Body, Controller, Delete, Get, Headers, Patch, Post, UseGuards } from '@nestjs/common';
import { DeleteDto, SignupDto, UpdateDto } from 'src/user/dto/user.dto';
import { ApiResponse } from 'src/dto/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';

/**
 * * @Get: get user information
 * * @Post: add user
 * * @Patch: update user information
 * * @Delete: delete user
 */
@Controller('user')
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) {}

    @Get() // get user information
    getUserInformation(): ApiResponse {
        return { statusCode: 200, message: 'shit' };
    }

    @Post()
    async signup(@Body() signupDto: SignupDto): Promise<ApiResponse> {
        return await this.userService.signup(signupDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch()
    async update(@Headers('Authorization') authorization: string, @Body() updateDto: UpdateDto) {
        return this.userService.update(
            await this.authService.extractJwt(authorization).id,
            updateDto,
        );
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    async delete(@Headers('Authorization') authorization: string, @Body() deleteDto: DeleteDto) {
        return this.userService.delete(
            await this.authService.extractJwt(authorization).id,
            deleteDto,
        );
    }
}
