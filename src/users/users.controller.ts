import {
   Body,
   Controller,
   Delete,
   Param,
   Post,
   Put,
   Req,
   UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/schemas/user.schema';
import { GetUser } from 'src/utilities/user.decorator';
import { AuthCredentialsDto } from './dto/auth.dto';
import { updateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
   constructor(
      private readonly userService: UsersService,
      private readonly productService: ProductsService,
      private readonly OrdersService: OrdersService,
   ) {}

   @Post('signup')
   signupUser(@Body() authCredentialsDto: AuthCredentialsDto) {
      return this.userService.signup(authCredentialsDto);
   }

   @Post('signin')
   signinUser(@Body() authCredentialsDto: AuthCredentialsDto) {
      return this.userService.signin(authCredentialsDto);
   }

   @Put('profile')
   updateProfile(@Body() updateProfileDto: updateProfileDto) {
      return this.userService.update(
         '6172da0e15d2f3b5ecf7727d',
         updateProfileDto,
      );
   }

   @Post('products/:id')
   @UseGuards(AuthGuard())
   async addProductTofavoraits(
      @Param('id') productId: string,
      @GetUser() user,
   ) {
      const product = await this.productService.findById(productId);

      const foundUser = await this.userService.findById(user._id);
      foundUser.favoraits.push(product);
      return await user.save();
   }

   @Delete('products/:id')
   @UseGuards(AuthGuard())
   async deleteFromFavoraits(@Param('id') id: string, @GetUser() userReq) {
      const user = await this.userService.findById(userReq._id);

      const updatedFavoraits = user.favoraits.filter((productId) => {
         return productId.toString() !== id;
      });

      user.favoraits = updatedFavoraits;

      return await user.save();
   }

   @Put('orders/:id')
   updateOrderStatus(@Param('id') id: string, @Body() req) {
      return this.OrdersService.updateOrderStatus(
         id,
         req.productId,
         req.status,
      );
   }
}
