import { Global, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
  ],
  exports: [],
})
export class AppModule {}
