import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from 'src/users/dto/signin-user.dto';
import { SignUpUserDto } from 'src/users/dto/signup-user.dto'
import { UserEntity } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
      @Inject(forwardRef(()=>UsersService))
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService
  ){}
  // Return JWT if signin performed as successful
  public async hashPassword (password: string): Promise<string>{
    return await bcrypt.hash(password, 10);
  }
  public async signin(signInUserDto: SignInUserDto): Promise<string|null> {
    const userInfo: any = await this.usersService.findUser(signInUserDto.id);
    if (bcrypt.compareSync(signInUserDto.password, userInfo[0].password)){
      return this.jwtService.signAsync({signInUserDto})
    }
    else return null;
  }
}
