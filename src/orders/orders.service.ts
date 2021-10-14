import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { customerDocument } from 'src/schemas/customer.schema';
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
      'order_list.product',
    );

    if (!orders) {
      throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    }

    return orders;
  }

  async getAllOrdersBySeller(sellerId: Object) {
    const orders = await this.OrderModel.find({}).populate(
      'order_list.product',
    );

    const sellerOrders = orders.map((order) => {
      return order.order_list.map(({ product }) => {
        if (product.sellerId.toHexString() === sellerId) {
          return order;
        }

        return;
      });
    });

    return sellerOrders;
  }

  async findOrderById(id: string) {
    return await this.OrderModel.find({ 'order_list.product._id': id });
  }

  async updateOrderStatus(id: string, productId: string, status: string) {
    const order = await this.OrderModel.findById(id);

    const product = order.order_list.find((orderProduct) => {
      return orderProduct.product._id.toString() === productId;
    });

    product.status = status;

    return await order.save();
  }

  async create(ordersDto: OrdersDto) {
    const { _id } = await this.OrderModel.create({
      ...ordersDto,
      customer: '616702c692c2c054430127cf',
    });

    // #TODO: populate product
    return await this.OrderModel.findById(_id).populate('order_list');
  }
}
