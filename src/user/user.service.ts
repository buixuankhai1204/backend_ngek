import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: number): string {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return user;
  }

  remove(id: number): string {
    return `This action removes a #${id} user`;
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
