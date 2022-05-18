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
    /* return hashed password if password is provided. if not, return undefined
     * null is a value
     * undefined means do nothing
     */
    return password ?? false ? await bcrypt.hash(password, 10) : undefined;
  }

  static comparePassword(
    rawPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(rawPassword, hashPassword);
  }

  // Return JWT if signin performed as successful
  // only YOU can update your information
  async generateToken(userDto: SigninDto): Promise<string | null> {
    const { id, name, email, password } = Object.assign(
      {},
      await this.userService.findUser(userDto.id),
    );
    if (AuthService.comparePassword(userDto.password, password))
      return this.jwtService.sign({ id, name, email });
    else return null;
  }
}
