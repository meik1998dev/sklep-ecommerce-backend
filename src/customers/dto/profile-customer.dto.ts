import { Product } from 'src/schemas/product.schema';

export class ProfileCustomerDto {
   firstName: string;

   lastName: string;
   
   phone: string;

   favoraits: Product[];
}
