import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { Seller, SellerSchema } from 'src/schemas/seller.schema';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';

@Module({
  imports: [
    forwardRef(() => ProductsModule),
    forwardRef(() => OrdersModule),
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }]),
  ],
  providers: [SellersService],
  controllers: [SellersController],
  exports: [SellersService],
})
export class SellerModule {}
