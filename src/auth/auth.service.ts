import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { compareStrWithHash } from '../bcrypt/bcrypt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  private readonly access_jwt_secret: string;
  private readonly refresh_jwt_secret: string;
  private readonly salt_round: number;
  private readonly user: string;

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.access_jwt_secret =
      this.configService.get<string>('ACCESS_JWT_SECRET');
    this.refresh_jwt_secret =
      this.configService.get<string>('REFRESH_JWT_SECRET');
    this.salt_round = +this.configService.get<string>('SECRET_SALT_ROUNDS');
    this.user = 'user';
  }

  async validate(username: string, password: string): Promise<User> {
    const user: User = await this.userService.getOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const valid: boolean = await compareStrWithHash(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Email or password are incorrect');
    }

    return user;
  }

  async register(registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user: User = await this.validate(
      loginDto.username,
      loginDto.password,
    );

    const tokens = await this.getTokens(user);

    await this.updateRefreshToken(user, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    const user: User = await this.prisma.user.findUnique({
      where: { id: userId, NOT: { refresh_token: null } },
    });

    if (!user) {
      throw new UnauthorizedException('User does not login');
    }

    const userWithRt: User = user;
    userWithRt.refresh_token = null;
    await this.prisma.user.update({ where: user, data: userWithRt });
  }

  async refreshTokens(refreshToken: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    if (refreshToken !== user.refresh_token) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user, tokens.refresh_token);
    return tokens;
  }

  async getTokens({ id, username, role }: User) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          username: username,
          role: role,
        },
        {
          secret: this.access_jwt_secret,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          username: username,
          role: role,
        },
        {
          secret: this.refresh_jwt_secret,
          expiresIn: '7d',
        },
      ),
    ]);
    return { access_token: at, refresh_token: rt };
  }
  async updateRefreshToken(user: User, refreshToken: string) {
    const userWithRt = Object.assign({}, user);

    delete user.refresh_token;
    userWithRt.refresh_token = refreshToken;

    await this.prisma.user.update({
      where: user,
      data: userWithRt,
    });
  }
}
