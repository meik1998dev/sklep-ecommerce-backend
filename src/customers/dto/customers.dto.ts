import { Product } from 'src/schemas/product.schema';

export class CustomersDto {
  first_name: string;

  last_name: string;

  email: string;

  password: string;

  phone: string;

  favoraits: Product[];
}
