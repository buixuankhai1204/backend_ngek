import { Test, TestingModule } from '@nestjs/testing';
import { ProductBillService } from './product-bill.service';

describe('ProductBillService', () => {
  let service: ProductBillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductBillService],
    }).compile();

    service = module.get<ProductBillService>(ProductBillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
