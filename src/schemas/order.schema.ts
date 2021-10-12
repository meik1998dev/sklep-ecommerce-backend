import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from './product.schema';
import { Customer } from './customer.schema';

export const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export interface Order extends Document {
  customer: Customer;
  products: ProductOrder[];
}

interface ProductOrder {
  product: Product;
  quantity: number;
}
