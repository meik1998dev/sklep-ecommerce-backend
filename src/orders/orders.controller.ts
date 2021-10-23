import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { OrdersDto } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersContorller {
   constructor(
      private readonly ordersService: OrdersService,
      private readonly userService: UsersService,
   ) {}

   @Get()
   GetAllOrders() {
      return this.ordersService.getAllOrdersByCustomer(
         '61673e2781fe91a335f63498',
      );
   }

   @Post()
   async createOrder(@Body() ordersDto: OrdersDto) {
      const createdOrder = await this.ordersService.create(ordersDto);

      const customer = await this.userService.findById(
         '616702c692c2c054430127cf',
      );

      createdOrder.order_list.map((order) => {
         customer.orders.push(order);
      });

      await customer.save();

      return createdOrder;
   }
}
