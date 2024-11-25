import { Module } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UserAddressController } from './user-address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAddress, UserAddressSchema } from './schemas/userAddress.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAddress.name, schema: UserAddressSchema },
    ]),
  ],
  controllers: [UserAddressController],
  providers: [UserAddressService],
})
export class UserAddressModule {}
