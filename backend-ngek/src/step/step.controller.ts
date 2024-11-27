import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { StepService } from './step.service.js';
import { CreateStepDto } from './dto/create-step.dto.js';
import { UpdateStepDto } from './dto/update-step.dto.js';
import { PutStepDto } from './dto/put-step.dto.js';
import { IResponse } from '../ultility/interfaceModel';

@Controller('step')
export class StepController {
  constructor(private readonly stepService: StepService,
  ) {
  }

  @Post()
  async create(@Body() createStepDtos: CreateStepDto): Promise<IResponse<undefined | boolean>> {
    try {
      const data = await this.stepService.create(createStepDtos);
      if (data) {
        return {
          statusCode: 200,
          message: 'Do something with this step success!',
          total: 1,
          data: [true],
        };
      }
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not generate new steps',
      }, HttpStatus.FORBIDDEN, {
        cause: 'Inert new item fail!',
      });

    } catch (error) {
      Logger.error(error.message);
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not generate new steps',
      }, HttpStatus.FORBIDDEN, {
        cause: 'Inert new item fail!',
      });
    }
  }

  @Put('/action')
  async stepAction(@Body() putStepDTO: PutStepDto): Promise<IResponse<undefined | boolean>> {
    try {
      const data = await this.stepService.stepAction(putStepDTO);
      if (data) {
        return {
          statusCode: 200,
          message: 'Do something with this step success!',
          total: 1,
          data: [data],
        };
      }
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not generate new steps',
      }, HttpStatus.FORBIDDEN, {
        cause: 'Inert new item fail!',
      });
    } catch (err) {
      console.error(err);
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not generate new steps',
      }, HttpStatus.FORBIDDEN, {
        cause: 'Inert new item fail!',
      });
    }
  }

  // @Get()
  // findAll() {
  //   return this.stepService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.stepService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
  //   return this.stepService.update(+id, updateStepDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.stepService.remove(+id);
  // }
}
