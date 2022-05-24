import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from 'src/post/post.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UserModule,
        AuthModule,
        PostModule,
    ],
})
export class AppModule {}
