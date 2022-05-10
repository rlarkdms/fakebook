import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from 'src/user/dto/signin-user.dto';
import { SignUpUserDto } from 'src/user/dto/signup-user.dto'
import { UserEntity } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,
        private readonly jwtService: JwtService
    ) {}

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    // Return JWT if signin performed as successful
    public async signin(signInUserDto: SignInUserDto): Promise<string | null> {
        const userInfo: any = await this.usersService.findUser(signInUserDto.id);
        if ( bcrypt.compareSync(signInUserDto.password, userInfo[0].password) ) {
            const token = this.jwtService.sign({ signInUserDto })
            console.log(this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET
            }))
            return token
        } else return null;
    }
}
