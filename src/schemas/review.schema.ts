import { Prop, Schema } from '@nestjs/mongoose';
import { Customer } from './customer.schema';
import * as mongoose from 'mongoose';
import { Seller } from './seller.schema';

@Schema()
export class Review {
  @Prop({ required: true })
  rate: string;

  @Prop()
  describtion: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
  })
  customerId: Customer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Seller' })
  sellerId: Seller;
}
