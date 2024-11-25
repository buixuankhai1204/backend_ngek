import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IResponse } from '../ultility/interfaceModel';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
  ) {
  }

  async create(createUserDto: CreateUserDto[]): Promise<IResponse<User>> {
    createUserDto[0].password = await bcrypt.hash(createUserDto[0].password, 10);
    const user = await this.userModel.create(createUserDto[0]);
    return {
      statusCode: 200,
      message: 'create new bill success',
      total: 1,
      data: [user],
    };
  }

  async createBulk(createUserDto: CreateUserDto[]): Promise<User[]> {
    return await this.userModel.create(createUserDto);
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ data: User; token: string }> {
    const user: User = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new UnauthorizedException();
    }

    if ((await bcrypt.compare(password, user.password)) === false) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.fullName,
      username: user.username,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload);

    return { data: user, token: token };
  }
}
