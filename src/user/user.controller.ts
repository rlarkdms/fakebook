import { Body, Controller, Delete, Get, Headers, Patch, Post, UseGuards } from '@nestjs/common';
import { DeleteDto, SigninDto, SignupDto, UpdateDto } from 'src/user/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';

/**
 * * @Get: signin
 * * @Post: signup
 * * @Patch: user information update
 * * @Delete: user delete
 */
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async signin(@Body() signinDto: SigninDto) {
    return this.userService.signin(signinDto);
  }

  @Post()
  async signup(@Body() signupDto: SignupDto) {
    return this.userService.signup(signupDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async update(@Headers('Authorization') authorization: string, @Body() updateDto: UpdateDto) {
    return this.userService.update(await this.authService.extractJwt(authorization).id, updateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async delete(@Headers('Authorization') authorization: string, @Body() deleteDto: DeleteDto) {
    return this.userService.delete(await this.authService.extractJwt(authorization).id, deleteDto);
  }
}
