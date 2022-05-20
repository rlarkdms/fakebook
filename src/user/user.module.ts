import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [AuthModule], // get JwtModule.register
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthService],
  exports: [UserService],
})
export class UserModule {}
