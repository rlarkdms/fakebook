import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from 'src/user/dto/signin.dto';
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
        let { id, password } = signinDto;
        const userInfo: UserEntity = await this.userService.findUser(id);
        if ( bcrypt.compareSync(password, userInfo.password) )
            return this.jwtService.sign(Object.assign({}, userInfo));
        else return null;
    }
}
