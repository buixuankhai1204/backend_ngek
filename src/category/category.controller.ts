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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';
import {
  Filtering,
  FilteringParams,
  Pagination,
  PaginationParams,
  Sorting,
  SortingParams,
} from '../decorators/baseService.decorator';
import { Types } from 'mongoose';
import { FindOneParams, IResponse } from '../ultility/interfaceModel';
import { AuthGuard } from '../user/user.guard';
import { Roles } from '../roles.decorator';

@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  create(@Body() createCategoryDto: CreateCategoryDto[]): Promise<IResponse<Category>> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['name', 'parentCategoryId']) sort?: Sorting,
    @FilteringParams(['name', 'parentCategoryId']) filter?: Filtering,
  ): Promise<IResponse<Category>> {
    return this.categoryService.findAll(filter, sort, paginationParams);
  }

  @Get(':id')
  findOne(@Param() id: FindOneParams): Promise<IResponse<Category>> {
    return this.categoryService.findOne(new Types.ObjectId(id.id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<IResponse<Category>> {
    return this.categoryService.updateOne(
      new Types.ObjectId(id),
      updateCategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse<Category>> {
    return this.categoryService.remove(new Types.ObjectId(id));
  }
}
