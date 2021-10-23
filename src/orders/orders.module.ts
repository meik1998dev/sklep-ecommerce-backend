import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/schemas/order.schema';
import { UsersModule } from 'src/users/users.module';
import { OrdersContorller } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
      forwardRef(() => UsersModule),
   ],
   controllers: [OrdersContorller],
   providers: [OrdersService],
   exports: [OrdersService],
})
export class OrdersModule {}
