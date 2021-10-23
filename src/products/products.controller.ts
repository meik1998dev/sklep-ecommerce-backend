import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private readonly userService: UsersService,
  ) {}

  // Create product by seller
  @Post()
  async CreateProduct(@Body() productDto: ProductDto) {
    // find the seller that will add the product
    const seller = await this.userService.findById(
      '6135207bc44d401934aad40d',
    );
    // create a product according to the body request
    const createdProduct = await this.productService.create(
      seller._id,
      productDto,
    );
    //update seller's products array
    seller.sellerProfile.products.push(createdProduct);

    await seller.save();

    return (await seller.populate('products')).sellerProfile.products;
  }

  // Update product informations
  @Put(':id')
  updateProduct(@Body() ProductDto: ProductDto, @Param('id') id: string) {
    return this.productService.update(id, ProductDto);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    const seller = await this.userService.findById(
      '6135207bc44d401934aad40d',
    );

    const newArr = seller.sellerProfile.products.filter((product: any) => {
      return product._id != id;
    });

    seller.sellerProfile.products = newArr;

    await seller.save();

    return (await seller.populate('products')).sellerProfile.products;
  }
}
