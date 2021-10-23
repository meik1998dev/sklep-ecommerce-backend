import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtStrategy } from './auth/jwt.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      forwardRef(() => ProductsModule),
      forwardRef(() => OrdersModule),
      JwtModule.register({
         secret: 'meik',
         signOptions: {
            expiresIn: 120,
         },
      }),
      PassportModule.register({ defaultStrategy: 'jwt' }),
   ],
   controllers: [UsersController],
   providers: [UsersService, JwtStrategy],
   exports: [JwtStrategy, PassportModule, UsersService],
})
export class UsersModule {}
