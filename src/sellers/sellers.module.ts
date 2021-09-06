import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from 'src/products/products.module';
import { Seller, SellerSchema } from 'src/schemas/seller.schema';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';

@Module({
  imports: [
    forwardRef(() => ProductsModule),
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }]),
  ],
  providers: [SellersService],
  controllers: [SellersController],
  exports: [SellersService],
})
export class SellerModule {}
