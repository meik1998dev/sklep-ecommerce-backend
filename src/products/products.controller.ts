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

@Controller('my_products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private readonly sellerService: SellersService,
  ) {}

  // Create product by seller
  @Post('add')
  async CreateProduct(@Body() productDto: ProductDto) {
    // find the seller that will add the product
    const seller = await this.sellerService.findSellerById(
      '6135207bc44d401934aad40d',
    );
    // create a product according to the body request
    const createdProduct = await this.productService.createProduct(
      seller._id,
      productDto,
    );
    //update seller's products array
    seller.products.push(createdProduct);
    return await seller.save();
  }

  // Update product informations
  @Put(':id')
  updateProduct(@Body() ProductDto: ProductDto) {
    return this.productService.updateProduct(
      '61360b37e22bb325f4b64781',
      ProductDto,
    );
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }
}
