import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { CustomerService } from './customers.service';
import * as mongoose from 'mongoose';
import { AuthCredentialsCustomerDto } from './dto/customers.dto';
import { ProfileCustomerDto } from './dto/profile-customer.dto';
@Controller('customer')
export class CustomerController {
   constructor(
      private readonly customerService: CustomerService,
      private readonly productService: ProductsService,
   ) {}

   @Post('signup')
   signupCustomer(
      @Body() authCredentialsCustomerDto: AuthCredentialsCustomerDto,
   ) {
      return this.customerService.signup(authCredentialsCustomerDto);
   }

   @Post('signin')
   signinCustomer(
      @Body() authCredentialsCustomerDto: AuthCredentialsCustomerDto,
   ) {
      return this.customerService.signin(authCredentialsCustomerDto);
   }

   @Put('profile')
   updateCustomer(@Body() customersDto: ProfileCustomerDto) {
      return this.customerService.update(
         '6135207bc44d401934aad40d',
         customersDto,
      );
   }

   @Post('products/:id')
   async addProductTofavoraits(@Param('id') id: string) {
      const product = await this.productService.findById(id);
      console.log(product);

      const customer = await this.customerService.findById(
         '61374990b8a3a23634dd4d0a',
      );
      customer.favoraits.push(product);
      return await customer.save();
   }

   @Delete('products/:id')
   async deleteFromFavoraits(@Param('id') id: string) {
      const customer = await this.customerService.findById(
         '61374990b8a3a23634dd4d0a',
      );

      const updatedFavoraits = customer.favoraits.filter((productId) => {
         return productId.toString() !== id;
      });

      customer.favoraits = updatedFavoraits;

      return await customer.save();
   }
}
