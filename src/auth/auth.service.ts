import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninDto, SignupDto } from 'src/user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from '../dto/response.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private prisma: PrismaService) {}
    /**
     * * return hashed password if password is provided. if not, return undefined
     * * below is prisma description
     * * null is a value
     * * undefined means do nothing
     */
    static async hashPassword(password: string): Promise<string | undefined> {
        return password ? await bcrypt.hash(password, 10) : undefined;
    }

    static comparePassword(rawPassword: string, hashPassword: string): Promise<boolean> {
        return bcrypt.compare(rawPassword, hashPassword);
    }

    async validateUser(signinDto: SigninDto): Promise<SignupDto> {
        const userInfo = await this.prisma.user.findUnique({ where: { id: signinDto.id } });
        if (!userInfo)
            throw new ApiResponse({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Cannot found user',
            });
        if (!(await AuthService.comparePassword(signinDto.password, userInfo.password)))
            throw new ApiResponse({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'Incorrect password',
            });
        return userInfo;
    }

    async generateToken(signinDto: SigninDto): Promise<ApiResponse> {
        try {
            const userInfo = await this.validateUser(signinDto);
            const token = this.jwtService.sign({
                id: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
            });
            return new ApiResponse({ message: token });
        } catch (e) {
            return e;
        }
    }
}
