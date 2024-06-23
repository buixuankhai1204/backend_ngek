import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { AuthGuard } from '../user/user.guard';
import { Image } from './schemas/image.schema';
import { RemoveImageDto } from './dto/Remove-image.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<Image[]> {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Body() removeDto: RemoveImageDto) {
    // await fs.unlink('./uploads/Screenshot from 2024-01-17 10-32-09', ()=> {
    // })
    return this.imageService.remove(removeDto);
  }
}
