import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { StepService } from './step.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { PutStepDto } from './dto/put-step.dto';
import { IResponse } from '../ultility/interfaceModel';

@Controller('step')
export class StepController {
  constructor(private readonly stepService: StepService) {
  }

  @Post()
  create(@Body() createStepDto: CreateStepDto) {
    return this.stepService.create(createStepDto);
  }

  @Put('/action')
  async stepAction(@Body() putStepDTO: PutStepDto): Promise<IResponse<unknown>> {
    try {
      const data = await this.stepService.stepAction(putStepDTO);
        return {
          statusCode: 200,
          message: 'Do something with this step success!',
          total: 1,
          data: [data],
        };
      // throw new HttpException({
      //   status: HttpStatus.FORBIDDEN,
      //   error: 'Can not find any request',
      // }, HttpStatus.FORBIDDEN, {
      //   cause: 'Inert new item fail!',
      // });
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not get all department',
      }, HttpStatus.FORBIDDEN, {
        cause: error,
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
