import { HttpStatus, Injectable } from '@nestjs/common';
import { DeleteDto, SigninDto, SignupDto, UpdateDto } from 'src/user/dto/user.dto';
import { ApiResponse } from 'src/dto/response.dto';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private authService: AuthService, private prisma: PrismaService) {}

    async findUserId(id: string): Promise<SignupDto | null> {
        return (await this.prisma.user.findUnique({ where: { id: id } })) ?? null;
    }
    async signup(signupDto: SignupDto): Promise<ApiResponse> {
        try {
            if (await this.findUserId(signupDto.id))
                throw new ApiResponse({
                    statusCode: HttpStatus.CONFLICT,
                    message: 'User ID is already exist',
                });
            signupDto.password = await AuthService.hashPassword(signupDto.password);
            await this.prisma.user.create({ data: signupDto });
            return new ApiResponse();
        } catch (e) {
            return e;
        }
    }

    async update(updateDto: UpdateDto): Promise<ApiResponse> {
        try {
            const userInfo = await this.authService.validateUser({
                id: updateDto.id,
                password: updateDto.password,
            });
            updateDto.newPassword = await AuthService.hashPassword(updateDto.newPassword);
            await this.prisma.user.update({
                where: { idx: userInfo['idx'] },
                data: {
                    id: updateDto.newId,
                    password: updateDto.newPassword,
                    name: updateDto.name,
                    email: updateDto.email,
                },
            });
            return new ApiResponse();
        } catch (e) {
            return e;
        }
    }

    async delete(deleteDto: DeleteDto): Promise<ApiResponse> {
        try {
            await this.authService.validateUser({ id: deleteDto.id, password: deleteDto.password });
            await this.prisma.user.delete({ where: { id: deleteDto.id } });
            return new ApiResponse();
        } catch (e) {
            return e;
        }
    }
}
