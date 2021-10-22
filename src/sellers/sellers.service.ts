import {
   ConflictException,
   Injectable,
   Param,
   UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller, SellerDocument } from 'src/schemas/seller.schema';
import { AuthCredentialsDto } from './dto/create-seller.dto';
import * as bcrypt from 'bcrypt';
import { ProfileSellerDto } from './dto/profile-seller.dto';
@Injectable()
export class SellersService {
   constructor(
      @InjectModel(Seller.name)
      private readonly sellerModel: Model<SellerDocument>,
   ) {}

   async signup(authCredentialsDto: AuthCredentialsDto) {
      const { email, password } = authCredentialsDto;

      const exists = await this.sellerModel.findOne({
         email,
      });

      if (exists) {
         throw new ConflictException('This email is already registerd');
      }

      const seller = new this.sellerModel();
      seller.email = email;
      seller.salt = await bcrypt.genSalt();
      seller.password = await this.hashPassword(password, seller.salt);

      return await seller.save();
   }

   async signin(authCredentialsDto: AuthCredentialsDto) {
      const { email, password } = authCredentialsDto;

      const seller = await this.sellerModel.findOne({ email });

      const isValid = await this.validatePassword(
         password,
         seller.salt,
         seller.password,
      );

      if (seller && isValid) {
         return seller;
      } else {
         throw new UnauthorizedException('Invalid credentials');
      }
   }

   async validatePassword(
      password: string,
      salt: string,
      storedPassword: string,
   ): Promise<boolean> {
      const hash = await bcrypt.hash(password, salt);

      // Compare hashed stored password with enterd password
      return hash === storedPassword;
   }

   async update(id: string, profileSellerDto: ProfileSellerDto) {
      return await this.sellerModel
         .findByIdAndUpdate(id, profileSellerDto)
         .exec();
   }

   async findById(id: string) {
      return await this.sellerModel.findById(id);
   }

   private async hashPassword(password: string, salt: string) {
      return bcrypt.hash(password, salt);
   }
}
