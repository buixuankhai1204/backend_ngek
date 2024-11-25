import { Test, TestingModule } from '@nestjs/testing';
import { ProductBillController } from './product-bill.controller';
import { ProductBillService } from './product-bill.service';

describe('ProductBillController', () => {
  let controller: ProductBillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductBillController],
      providers: [ProductBillService],
    }).compile();

    controller = module.get<ProductBillController>(ProductBillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
