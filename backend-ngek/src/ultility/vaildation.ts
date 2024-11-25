import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export enum EImageType {
  Png = 'png',
  Jpg = 'jpg',
  Jpeg = 'jpeg',
}

export class Validation {
  public static checkUrl(url: string): boolean {
    const parts: string[] = url.split('.');
    if (parts.length != 2) {
      return false;
    }

    if (parts[1] != EImageType.Png && parts[1] != EImageType.Jpg && parts[1] != EImageType.Jpeg) {
      return false;
    }
  }
}


export class NoFieldValidationPipe<T> implements PipeTransform {
  constructor(private readonly fieldNames: (keyof T)[]) {
  }

  transform(value: T, metadata: ArgumentMetadata): T {
    this.fieldNames.forEach((fieldName) => {
      if (!value[fieldName]) {
        throw new BadRequestException(`${String(fieldName)} should not be provided when updating a product`);
      }
    });
    return value;
  }

}