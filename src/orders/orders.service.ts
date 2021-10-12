import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/schemas/order.schema';
import { OrdersDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly OrderModel: Model<OrderDocument>,
  ) {}
  async create(ordersDto: OrdersDto) {
    const { _id } = await this.OrderModel.create({
      ...ordersDto,
      customerId: '61374990b8a3a23634dd4d0a',
    });
    return await (
      await this.OrderModel.findById(_id)
    ).ordersList.map((_) => {
      _.productId.category;
    });
    //  return await order.ordersList.map((_) => _.productId);
  }
}
