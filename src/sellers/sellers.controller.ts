import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { SellersService } from './sellers.service';

@Controller('seller')
export class SellersController {
  constructor(
    private readonly sellerService: SellersService,
    private readonly productService: ProductsService,
    private readonly OrdersService: OrdersService,
  ) {}

  @Post('signup')
  createProfile(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.create(createSellerDto);
  }

  @Put('profile')
  updateProfile(
    @Param('id') id: string,
    @Body() createSellerDto: CreateSellerDto,
  ) {
    return this.sellerService.update(
      '6135207bc44d401934aad40d',
      createSellerDto,
    );
  }

  @Get('profile')
  getSellerProfile() {
    return this.sellerService.findById('6135207bc44d401934aad40d');
  }

  @Get('my_products')
  getAllProducts() {
    return this.productService.findAllBySellerId('6135207bc44d401934aad40d');
  }

  @Get("orders")
  getAllOrders(){
    return this.OrdersService.getAllOrdersBySeller("6135207bc44d401934aad40d")
  }

  @Put("orders/:id")
  updateOrderStatus(){
    return
  }
}
