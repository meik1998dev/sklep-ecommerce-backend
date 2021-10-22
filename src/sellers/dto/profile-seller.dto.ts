import { IsString } from "class-validator";

export class ProfileSellerDto {
   @IsString()
   name: string; 

   product_genre: string;

   phone: string;

   logo_Image: string;

   website: string;

   overview: string;

   branches: string[];
}
