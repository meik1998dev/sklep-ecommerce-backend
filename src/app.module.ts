import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { SellerModule } from './sellers/sellers.module';

@Module({
  imports: [
    ProductsModule,
    SellerModule,
    MongooseModule.forRoot('mongodb://localhost:27017/ecommerce'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
