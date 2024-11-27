import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors, UploadedFile, Logger,
} from '@nestjs/common';
import { RequestService } from './request.service.js';
import { CreateRequestDto } from './dto/create-request.dto.js';
import { RequestEntity } from './entities/request.entity';
import { IResponse } from '../ultility/interfaceModel';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from '../ultility/validationFileUpload';
import fs from 'fs';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {
  }

  @Post()
  async create(@Body() createRequestDto: CreateRequestDto): Promise<IResponse<RequestEntity>> {
    try {
      const data = await this.requestService.create(createRequestDto);
      if (data) {
        return {
          statusCode: 200,
          message: 'Request created successfully',
          total: 1,
          data: [data],
        };
      }
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not create new request',
      }, HttpStatus.FORBIDDEN, {
        cause: 'Inert new item fail!',
      });
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not create new request',
      }, HttpStatus.FORBIDDEN, {
        cause: error,
      });
    }
  }


  @Get()
  async findAllRequestByOwnerId(@Param('id') ownerId: number): Promise<IResponse<RequestEntity[]>> {
    try {
      const data = await this.requestService.findAllRequestByOwnerId(ownerId);
      if (data) {
        return {
          statusCode: 200,
          message: 'find all requests by owner id success!',
          total: 1,
          data: [data],
        };
      }
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not find any request',
      }, HttpStatus.FORBIDDEN, {
        cause: 'Inert new item fail!',
      });
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not get all department',
      }, HttpStatus.FORBIDDEN, {
        cause: error,
      });
    }
  }

  @Post('/proccess-generate')
  @UseInterceptors(FileInterceptor('test'))
  async processGenerate(@UploadedFile() file: Express.Multer.File): Promise<IResponse<boolean>> {
    try {
      const data = await this.requestService.parseFileContentMnd(file.buffer.toString().split('\n'));
      if (data) {
        return {
          statusCode: 200,
          message: 'find all requests by owner id success!',
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.requestService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
  //   return this.requestService.update(+id, updateRequestDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.requestService.remove(+id);
  // }
}
