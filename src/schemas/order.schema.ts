import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from './product.schema';
import { Customer } from './customer.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  ordersList: Cart[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  })
  customerId: Customer;
}

@Schema()
export class Cart {
  @Prop()
  quantity: number;

  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'Product' })
  productId: Product;
}

export var CartSchema = SchemaFactory.createForClass(Cart);

export var OrderSchema = SchemaFactory.createForClass(Order);
