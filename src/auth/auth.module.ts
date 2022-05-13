import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserModule } from "src/user/user.module";
require("dotenv").config();

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '7d' }
        })
    ],
    providers: [ AuthService, JwtStrategy ],
    exports: [ AuthService ]
})
export class AuthModule {
}
