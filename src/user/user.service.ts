import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  DeleteDto,
  SigninDto,
  SignupDto,
  UpdateDto,
} from 'src/user/dto/user.dto';
import { SuccessDto } from 'src/user/dto/response.success.dto';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private prisma: PrismaService,
  ) {}

  private static successResponse(message?): SuccessDto {
    return { statusCode: HttpStatus.OK, message: message ?? 'success' }; // default value is success
  }

  // return user's information if id is matched. if not, return null
  // This method used on auth too. that is why this is public method
  async findUser(userId: SigninDto['id']): Promise<SignupDto | null> {
    return (
      (await this.prisma.user.findUnique({ where: { id: userId } })) ?? null
    );
  }

  async signin(signinDto: SigninDto): Promise<SuccessDto> {
    if (!(await this.findUser(signinDto.id)))
      throw new HttpException('Cannot found user', HttpStatus.NOT_FOUND);
    const token = await this.authService.generateToken(signinDto);
    if (!token)
      throw new HttpException('Password not match', HttpStatus.NOT_ACCEPTABLE);
    return UserService.successResponse(token);
  }

  async signup(signupDto: SignupDto): Promise<SuccessDto> {
    if (await this.findUser(signupDto.id))
      throw new HttpException('User ID is already exist', HttpStatus.CONFLICT);
    signupDto.password = await AuthService.hashPassword(signupDto.password);
    await this.prisma.user.create({ data: signupDto });
    return UserService.successResponse();
  }

  // changeable: id password email name
  // can't access other user
  async update(id: SigninDto['id'], updateDto: UpdateDto): Promise<SuccessDto> {
    updateDto.password = await AuthService.hashPassword(updateDto.password);

    await this.prisma.user.update({
      where: { idx: (await this.findUser(id))['idx'] },
      data: updateDto,
    });
    return UserService.successResponse();
  }

  async delete(id: SigninDto['id'], deleteDto: DeleteDto): Promise<SuccessDto> {
    if (
      !AuthService.comparePassword(
        deleteDto.password,
        (await this.findUser(id))['password'],
      )
    )
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    await this.prisma.user.delete({ where: { id: id } });
    return UserService.successResponse();
  }
}
