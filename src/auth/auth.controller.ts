import { Body, Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { SigninDto } from '../user/dto/user.dto';

// * @Get: request user token
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private prisma: PrismaService) {}

    @Get()
    async generateToken(@Body() signinDto: SigninDto) {
        return this.authService.generateToken(signinDto);
    }
}
