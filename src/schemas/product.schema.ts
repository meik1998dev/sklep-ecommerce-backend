import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Seller } from './seller.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
@Prop({auto: true})
_id : string

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, enum: ['Used', 'New', 'Not available now'] })
  status: string;

  @Prop()
  sold_count: number;

  @Prop()
  main_image: string;

  @Prop([String])
  secondary_images: [string];

  @Prop()
  describtion: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true })
  sellerId: mongoose.Types.ObjectId;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
