import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './user.guard';
import { FindOneParams, IResponse } from '../ultility/interfaceModel';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @UseGuards(AuthGuard)
  create(@Body() createUserDto: CreateUserDto[]): Promise<IResponse<User>> {
    return this.userService.create(createUserDto);
  }

  @Get()
  // @UseGuards(AuthGuard)
  findAll(): Promise<IResponse<User>> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: FindOneParams): Promise<IResponse<User>> {
    return this.userService.findOne(param.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<IResponse<User>> {
    return this.userService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse<User>> {
    return this.userService.remove(id);
  }

  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ data: User; token: string }> {
    const debug = await this.userService.signIn(
      signInDto.username,
      signInDto.password,
    );

    console.log(debug);
    return this.userService.signIn(signInDto.username, signInDto.password);
  }
}
