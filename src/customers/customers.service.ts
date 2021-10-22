import {
   ConflictException,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, customerDocument } from 'src/schemas/customer.schema';
import { AuthCredentialsCustomerDto } from './dto/customers.dto';
import { ProfileCustomerDto } from './dto/profile-customer.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CustomerService {
   constructor(
      @InjectModel(Customer.name)
      private readonly customerModel: Model<customerDocument>,
   ) {}

   async signup(authCredentialsCustomerDto: AuthCredentialsCustomerDto) {
      const { email, password } = authCredentialsCustomerDto;

      const exists = await this.customerModel.findOne({
         email,
      });

      if (exists) {
         throw new ConflictException('This email is already registerd');
      }

      const customer = new this.customerModel();
      customer.email = email;
      customer.salt = await bcrypt.genSalt();
      customer.password = await this.hashPassword(password, customer.salt);

      return await customer.save();
   }

   async signin(authCredentialsCustomerDto: AuthCredentialsCustomerDto) {
      const { email, password } = authCredentialsCustomerDto;

      const customer = await this.customerModel.findOne({ email });

      const isValid = await this.validatePassword(
         password,
         customer.salt,
         customer.password,
      );

      if (customer && isValid) {
         return customer;
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

   async update(id: string, profileCustomerDto: ProfileCustomerDto) {
      return await this.customerModel.findByIdAndUpdate(id, profileCustomerDto);
   }

   async findById(id: string) {
      return await this.customerModel.findById(id);
   }

   private async hashPassword(password: string, salt: string) {
      return bcrypt.hash(password, salt);
   }
}
