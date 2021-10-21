import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SellersService } from 'src/sellers/sellers.service';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private readonly sellerService: SellersService,
  ) {}

  // Create product by seller
  @Post()
  async CreateProduct(@Body() productDto: ProductDto) {
    // find the seller that will add the product
    const seller = await this.sellerService.findById(
      '6135207bc44d401934aad40d',
    );
    // create a product according to the body request
    const createdProduct = await this.productService.create(
      seller._id,
      productDto,
    );
    //update seller's products array
    seller.products.push(createdProduct);

    await seller.save();

    return (await seller.populate('products')).products;
  }

  // Update product informations
  @Put(':id')
  updateProduct(@Body() ProductDto: ProductDto, @Param('id') id: string) {
    return this.productService.update(id, ProductDto);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    const seller = await this.sellerService.findById(
      '6135207bc44d401934aad40d',
    );

    const newArr = seller.products.filter((product: any) => {
      return product._id != id;
    });

    seller.products = newArr;

    await seller.save();

    return (await seller.populate('products')).products;
  }
}
