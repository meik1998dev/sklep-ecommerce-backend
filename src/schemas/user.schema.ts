import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderProducts } from './order.schema';
import { Product } from './product.schema';
import * as mongoose from 'mongoose';

export type userDocument = User & Document;

@Schema()
export class User {
   @Prop()
   firstName: string;

   @Prop()
   lastName: string;

   @Prop({ required: true })
   password: string;

   @Prop({ required: true })
   salt: string;

   @Prop({ required: true })
   email: string;

   @Prop()
   phone: string;

   @Prop()
   profile_image: string;

   @Prop({ required: true })
   isSeller: boolean;

   @Prop()
   orders: OrderProducts[];

   @Prop({ type: [mongoose.SchemaTypes.ObjectId], ref: 'Product', _id: true })
   favoraits: Product[];

   @Prop(
      raw({
         name: { type: String },
         productGenre: { type: String },
         logoImage: { type: String },
         website: { type: String },
         overview: { type: String },
         branches: [{ type: String }],
         products: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
         },
         orders: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
         },
      }),
   )
   sellerProfile: Record<string, any>;
}
export var UserSchema = SchemaFactory.createForClass(User);
