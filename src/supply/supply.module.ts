import { Module } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { SupplyController } from './supply.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Supply, SupplySchema } from './schemas/supply.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supply.name, schema: SupplySchema },
    ]),
  ],
  controllers: [SupplyController],
  providers: [SupplyService],
})
export class SupplyModule {}
