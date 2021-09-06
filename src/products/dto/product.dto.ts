import { ObjectId } from 'mongoose';

export class ProductDto {
  name: string;

  category: string;

  status: string;

  sold_count: number;

  main_image: string;

  secondary_images: [string];

  describtion: string;
}
