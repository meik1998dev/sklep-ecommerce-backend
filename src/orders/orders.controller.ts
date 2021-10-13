import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersDto } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersContorller {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  GetAllOrders() {
    return this.ordersService.getAllOrdersByCustomer('61374990b8a3a23634dd4d0a');
  }

  @Post()
  createOrder(@Body() ordersDto: OrdersDto) {
    console.log(ordersDto);

    return this.ordersService.create(ordersDto);
  }
}
