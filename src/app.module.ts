import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: 5432,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASS,
          database: process.env.DATABASE_NAME,
          autoLoadEntities: true,
          synchronize: true,
          entities: ["dist/**/*.entity{.ts,.js}"]
      }),
      UsersModule,
      AuthModule
  ]
})
export class AppModule {}