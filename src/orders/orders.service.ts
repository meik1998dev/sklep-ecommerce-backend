import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { OrdersDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel("Order")
    private readonly OrderModel: Model<Order>,
  ) {}
  async create(ordersDto: OrdersDto) {
     return await this.OrderModel.create({
      ...ordersDto,
      customer: '61374990b8a3a23634dd4d0a',
    });

  }
}
