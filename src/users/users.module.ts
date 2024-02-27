import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, ConfigService, JwtService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
