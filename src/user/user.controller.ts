import { Body, Controller, Delete, Get, Headers, Put, Post, UseGuards } from '@nestjs/common';
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
    @Put()
    async update(@Body() updateDto: UpdateDto): Promise<ApiResponse> {
        return this.userService.update(updateDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    async delete(@Body() deleteDto: DeleteDto): Promise<ApiResponse> {
        return this.userService.delete(deleteDto);
    }
}
