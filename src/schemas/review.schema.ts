import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';
import { Seller } from './seller.schema';

@Schema()
export class Review {
  @Prop({ required: true })
  rate: string;

  @Prop()
  describtion: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Seller' })
  seller: Seller;
}
