import { HttpStatus, Injectable } from '@nestjs/common';
import { DeleteDto, SigninDto, SignupDto, UpdateDto } from 'src/user/dto/user.dto';
import { ApiResponse } from 'src/dto/response.dto';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private authService: AuthService, private prisma: PrismaService) {}

    async findUser(id: string): Promise<SignupDto | null> {
        return (await this.prisma.user.findUnique({ where: { id: id } })) ?? null;
    }

    async signup(signupDto: SignupDto): Promise<ApiResponse> {
        if (await this.findUser(signupDto.id))
            return new ApiResponse({
                statusCode: HttpStatus.CONFLICT,
                message: 'User ID is already exist',
            });

        signupDto.password = await AuthService.hashPassword(signupDto.password);
        try {
            await this.prisma.user.create({ data: signupDto });
            return new ApiResponse();
        } catch (e) {
            throw new ApiResponse({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Cannot create user',
            });
        }
    }

    async update(requestUserJwtId: SigninDto['id'], updateDto: UpdateDto): Promise<ApiResponse> {
        const userInfo = await this.findUser(requestUserJwtId);
        if (!userInfo)
            return new ApiResponse({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Cannot found user',
            });
        if (!(await AuthService.comparePassword(updateDto.password, userInfo.password)))
            return new ApiResponse({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'Incorrect password',
            });
        try {
            let { newPassword } = updateDto;
            const { id, name, email } = updateDto;
            newPassword = await AuthService.hashPassword(newPassword);
            await this.prisma.user.update({
                where: { idx: userInfo['idx'] },
                data: { id: id, password: newPassword, name: name, email: email },
            });
            return new ApiResponse();
        } catch (e) {
            throw new ApiResponse({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Cannot update user',
            });
        }
    }

    async delete(requestUserJwtId: SigninDto['id'], deleteDto: DeleteDto): Promise<ApiResponse> {
        const userInfo = await this.findUser(requestUserJwtId);
        if (!userInfo)
            return new ApiResponse({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Cannot found user',
            });
        if (!(await AuthService.comparePassword(deleteDto.password, userInfo.password)))
            return new ApiResponse({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'Incorrect password',
            });
        try {
            await this.prisma.user.delete({ where: { id: requestUserJwtId } });
            return new ApiResponse();
        } catch (e) {
            throw new ApiResponse({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Cannot delete user',
            });
        }
    }
}
