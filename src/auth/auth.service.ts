import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from 'src/user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { SuccessDto } from '../dto/response.success.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}
  private static successResponse(message?): SuccessDto {
    return { statusCode: HttpStatus.OK, message: message ?? 'success' };
    //겨우 이런 기능 가져다 쓰려고 순환참조 문제 발생하는건 좀 그렇다
  }
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

  extractJwt(authorization: string) {
    const token = authorization.replace('Bearer ', '');
    const userInfo = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    return JSON.parse(JSON.stringify(userInfo));
  }

  async generateToken(signinDto: SigninDto): Promise<SuccessDto> {
    const userInfo = await this.prisma.user.findUnique({ where: { id: signinDto.id } });
    if (!userInfo) throw new HttpException('Cannot found user', HttpStatus.NOT_FOUND);

    if (await AuthService.comparePassword(signinDto['password'], userInfo.password)) {
      return AuthService.successResponse(
        this.jwtService.sign({ id: userInfo.id, name: userInfo.name, email: userInfo.email }),
      );
    }
    throw new HttpException('Password not match', HttpStatus.NOT_ACCEPTABLE);
  }
}
