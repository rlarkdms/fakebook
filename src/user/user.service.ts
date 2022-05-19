import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeleteDto, SigninDto, SignupDto, UpdateDto } from 'src/user/dto/user.dto';
import { SuccessDto } from 'src/dto/response.success.dto';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  private static successResponse(message?): SuccessDto {
    return { statusCode: HttpStatus.OK, message: message ?? 'success' };
  }

  async findUser(id: string): Promise<SignupDto | null> {
    return (await this.prisma.user.findUnique({ where: { id: id } })) ?? null;
  }

  async signin(signinDto: SigninDto): Promise<SuccessDto> {
    if (!(await this.findUser(signinDto.id)))
      throw new HttpException('Cannot found user', HttpStatus.NOT_FOUND);
    const token = await this.authService.generateToken(signinDto);
    if (!token) throw new HttpException('Password not match', HttpStatus.NOT_ACCEPTABLE);
    return UserService.successResponse(token);
  }

  async signup(signupDto: SignupDto): Promise<SuccessDto> {
    if (await this.findUser(signupDto.id))
      throw new HttpException('User ID is already exist', HttpStatus.CONFLICT);
    signupDto.password = await AuthService.hashPassword(signupDto.password);
    await this.prisma.user.create({ data: signupDto });
    return UserService.successResponse();
  }

  async update(requestUserId: SigninDto['id'], updateDto: UpdateDto): Promise<SuccessDto> {
    if (
      !(await AuthService.comparePassword(
        updateDto.password,
        (
          await this.findUser(requestUserId)
        )['password'],
      ))
    )
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    let { id, password, newPassword, name, email } = updateDto;
    newPassword = await AuthService.hashPassword(newPassword);
    await this.prisma.user.update({
      where: { idx: (await this.findUser(requestUserId))['idx'] },
      data: { id: id, password: newPassword, name: name, email: email },
    });
    return UserService.successResponse();
  }

  async delete(requestUserId: SigninDto['id'], deleteDto: DeleteDto): Promise<SuccessDto> {
    if (
      !AuthService.comparePassword(
        deleteDto.password,
        (await this.findUser(requestUserId))['password'],
      )
    )
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    await this.prisma.user.delete({ where: { id: requestUserId } });
    return UserService.successResponse();
  }
}
