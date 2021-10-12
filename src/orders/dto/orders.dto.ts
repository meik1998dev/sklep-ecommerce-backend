import { Product } from 'src/schemas/product.schema';
import { Cart } from '../../schemas/order.schema';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export interface OrdersDto {
  ordersList: {
    productId: string;
    quantity: string;
  }[];
}
