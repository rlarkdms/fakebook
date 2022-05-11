import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from 'src/user/dto/signin.dto';
import { SignupDto } from 'src/user/dto/signup.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    // Return JWT if signin performed as successful
    public async signin(signinDto: SigninDto): Promise<string | null> {
        const userInfo: any = await this.userService.findUser(signinDto.id);
        if ( bcrypt.compareSync(signinDto.password, userInfo[0].password) ) {
            const token = this.jwtService.sign({ signInUserDto: signinDto })
            console.log(this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET
            }))
            return token
        } else return null;
    }
}
