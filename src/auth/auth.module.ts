import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategy/at.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
// import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenStrategy } from './strategy/rt.strategy';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ConfigService,
    UsersService,
    PrismaService,
  ],
})
export class AuthModule {}
