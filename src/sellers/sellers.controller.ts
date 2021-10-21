import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { AuthCredentialsDto } from './dto/create-seller.dto';
import { ProfileSellerDto } from './dto/profile-seller.dto';
import { SellersService } from './sellers.service';

@Controller('seller')
export class SellersController {
   constructor(
      private readonly sellerService: SellersService,
      private readonly productService: ProductsService,
      private readonly OrdersService: OrdersService,
   ) {}

   @Post('signup')
   signup(@Body() authCredentialsDto: AuthCredentialsDto) {
      return this.sellerService.signup(authCredentialsDto);
   }

   @Put('profile')
   updateProfile(@Body() profileSellerDto: ProfileSellerDto) {
      return this.sellerService.update(
         '6165e6e7dfa6606436c92d42',
         profileSellerDto,
      );
   }

   @Get('profile')
   getSellerProfile() {
      return this.sellerService.findById('6165e6e7dfa6606436c92d42');
   }

   @Get('orders')
   getAllOrders() {
      return this.OrdersService.getAllOrdersBySeller(
         '6135207bc44d401934aad40d',
      );
   }

   @Put('orders/:id')
   updateOrderStatus(@Param('id') id: string, @Body() req) {
      return this.OrdersService.updateOrderStatus(
         id,
         req.productId,
         req.status,
      );
   }
}
