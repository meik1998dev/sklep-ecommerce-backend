import { IsString, MinLength } from "class-validator";

export class CreateSellerDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(8)
  password: string;

  email: string;

  product_genre: string;

  phone: string;

  logo_Image: string;

  website: string;

  overview: string;

  branches: string[];
}
