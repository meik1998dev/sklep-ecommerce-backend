import * as mongoose from 'mongoose';
import { Product } from './product.schema';
import { Customer } from './customer.schema';

export const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  order_list: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
      status: {
        type: String,
        enum: ['Pending', 'Rejected', 'Accepted'],
        default: 'Pending',
      },
    },
  ],
});

export interface Order extends Document {
  customer: Customer;
  order_list: OrderProducts[];
}

export interface OrderProducts {
  product: Product;
  quantity: number;
  status: string;
}
