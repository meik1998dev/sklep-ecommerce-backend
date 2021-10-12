import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { SellerModule } from './sellers/sellers.module';

@Module({
  imports: [
    ProductsModule,
    SellerModule,
    OrdersModule,
    CustomerModule,
    MongooseModule.forRoot('mongodb://localhost:27017/ecommerce'),
  ],
})
export class AppModule {}
