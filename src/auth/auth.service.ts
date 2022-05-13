import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from 'src/user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from "src/user/user.service";


@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    // Return JWT if signin performed as successful
    // only YOU can update your information
    async generateToken(signinDto: SigninDto): Promise<string | null> {
        const {id, name, email, password} = Object.assign({}, await this.userService.findUser(signinDto.id));
        if ( bcrypt.compareSync(signinDto.password, password) )
            return this.jwtService.sign({id, name, email});
        else return null;
    }
}
