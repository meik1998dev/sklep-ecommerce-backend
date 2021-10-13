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
    const orders = await this.OrderModel.find({ customer: id }).populate(
      'orders_list.product',
    );

    if (!orders) {
      throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    }

    return orders;
  }

  async getAllOrdersBySeller(sellerId : Object) {
    const orders = await this.OrderModel.find({}).populate(
      'orders_list.product',
    );

    const sellerOrders = orders.map((order) => {
      console.log(order);

      return order.orders_list.map(({ product }) => {
        if (product.sellerId.toHexString() === sellerId) {
          return order;
        }

        return;
      });
    });

    return sellerOrders;
  }

  async create(ordersDto: OrdersDto) {
    const { _id } = await this.OrderModel.create({
      ...ordersDto,
      customer: '61374990b8a3a23634dd4d0a',
    });
    return await this.OrderModel.findById(_id)
      .populate('customer')
      .populate('orders_list.product');
  }
}
