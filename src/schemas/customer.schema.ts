import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { Product } from './product.schema';
import { Review } from './review.schema';
import * as mongoose from 'mongoose';

@Schema()
export class Customer {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop()
  profile_image: string;

  @Prop([Order])
  orders: Order[];

  @Prop([Review])
  reviews: Review[];

  @Prop(
    raw({
      products: [
        { productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } },
      ],
    }),
  )
  favoraits: Record<any, any>;
}

export var CustomerSchema = SchemaFactory.createForClass(Customer);
