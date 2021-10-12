import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { OrdersDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order')
    private readonly OrderModel: Model<Order>,
  ) {}

  async getAllOrdersByCustomer(id: Object) {
    const orders = await this.OrderModel.find({ customer: id })
      .populate('customer')
      .populate('products.product');

    if (!orders) {
      throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    }
    return orders;
  }

  async create(ordersDto: OrdersDto) {
    const { _id } = await this.OrderModel.create({
      ...ordersDto,
      customer: '61374990b8a3a23634dd4d0a',
    });
    return await this.OrderModel.findById(_id)
      .populate('customer')
      .populate('products.product');
  }
}
