import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from 'src/customers/customers.module';
import { OrderSchema } from 'src/schemas/order.schema';
import { SellerModule } from 'src/sellers/sellers.module';
import { OrdersContorller } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    forwardRef(() => SellerModule),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    forwardRef(() => CustomerModule),
  ],
  controllers: [OrdersContorller],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
