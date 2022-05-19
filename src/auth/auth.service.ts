import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from 'src/user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  static async hashPassword(password: string): Promise<string | undefined> {
    /**
     * * return hashed password if password is provided. if not, return undefined
     * * below is prisma description
     * * null is a value
     * * undefined means do nothing
     */
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

  async generateToken(signinDto: SigninDto): Promise<string | null> {
    const { id, password, name, email } = await this.userService.findUser(signinDto.id);
    if (await AuthService.comparePassword(signinDto['password'], password)) {
      return this.jwtService.sign({ id, name, email });
    }
    return null;
  }
}
