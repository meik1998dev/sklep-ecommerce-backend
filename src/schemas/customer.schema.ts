import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Order, OrderProducts } from './order.schema';
import { Product } from './product.schema';
import { Review } from './review.schema';
import * as mongoose from 'mongoose';

export type customerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  profile_image: string;

  @Prop()
  orders: OrderProducts[];

  @Prop([Review])
  reviews: Review[];

  @Prop({ type: [mongoose.SchemaTypes.ObjectId], ref: 'Product', _id: true })
  favoraits: Product[];
}

export var CustomerSchema = SchemaFactory.createForClass(Customer);
