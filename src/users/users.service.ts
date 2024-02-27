import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { encodeStr } from '../bcrypt/bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  private readonly salt_round: number;
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.salt_round = +this.configService.get<string>('SECRET_SALT_ROUNDS');
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async getFew(skip: number, limit: number): Promise<User[]> {
    return this.prisma.user.findMany({ skip, take: limit });
  }
  async getOneById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }
  async getOneByUsername(username: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { username } });
  }
  async create(newUser: RegisterDto): Promise<User> {
    const user: User = await this.prisma.user.findFirst({
      where: { username: newUser.username },
    });
    if (user) throw new BadRequestException('User already exist');

    const hash_password = await encodeStr(newUser.password, this.salt_round);
    return this.prisma.user
      .create({
        data: {
          username: newUser.username,
          password: hash_password,
        },
      })
      .then((user: User) => {
        user.password = newUser.password;
        return user;
      });
  }
}
