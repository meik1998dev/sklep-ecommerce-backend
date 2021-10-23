import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
   imports: [
      ProductsModule,
      OrdersModule,
      MongooseModule.forRoot('mongodb://localhost:27017/ecommerce'),
      UsersModule,
   ],
})
export class AppModule {}
