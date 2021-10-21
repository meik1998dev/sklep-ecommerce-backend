import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { Product } from './product.schema';
import { Review } from './review.schema';
import * as mongoose from 'mongoose';

export type SellerDocument = Seller & Document;

@Schema()
export class Seller {
  @Prop({ required: true })
  name: string;

  @Prop({required : true})
  email: string;

  @Prop({required : true})
  password: string;

  @Prop()
  product_genre: string;

  @Prop()
  phone: string;

  @Prop()
  logo_Image: string;

  @Prop()
  website: string;

  @Prop()
  overview: string;

  @Prop()
  branches: string[];

  @Prop()
  reviews: Review[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];

  @Prop()
  orders: Order[];
}

export var SellerSchema = SchemaFactory.createForClass(Seller);
