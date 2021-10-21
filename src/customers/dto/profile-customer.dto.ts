import { Product } from 'src/schemas/product.schema';

export class ProfileCustomerDto {
   first_name: string;

   last_name: string;
   
   phone: string;

   favoraits: Product[];
}
