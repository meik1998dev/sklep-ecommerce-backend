import { Body, Controller, Post } from '@nestjs/common';
import { OrdersDto } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersContorller {
  constructor(private readonly ordersService: OrdersService) {}
  @Post()
  createOrder(@Body() ordersDto: OrdersDto) {
    console.log(ordersDto);

    return this.ordersService.create(ordersDto);
  }
}
