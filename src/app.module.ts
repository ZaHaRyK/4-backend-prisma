import { Module } from '@nestjs/common';
import { EntityModule } from './entity/entity.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    EntityModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public/main'),
    }),
    ConfigModule,
    PrismaModule,
  ],
})
export class AppModule {}
