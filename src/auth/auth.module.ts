import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UsersModule } from "src/users/users.module";
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
      forwardRef(()=>UsersModule),
      PassportModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),
  ],
  providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
