import { PipeTransform, Injectable, ArgumentMetadata, Logger } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 100000;
    return true;
  }
}