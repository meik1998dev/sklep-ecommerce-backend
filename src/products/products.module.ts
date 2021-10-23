import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { UsersModule } from 'src/users/users.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: Product.name, schema: ProductSchema },
      ]),
      forwardRef(() => UsersModule),
   ],
   controllers: [ProductsController],
   providers: [ProductsService],
   exports: [ProductsService],
})
export class ProductsModule {}
