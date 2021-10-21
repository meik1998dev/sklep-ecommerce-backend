import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, customerDocument } from 'src/schemas/customer.schema';
import { AuthCredentialsCustomerDto } from './dto/customers.dto';
import { ProfileCustomerDto } from './dto/profile-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<customerDocument>,
  ) {}

  async signup(authCredentialsCustomerDto: AuthCredentialsCustomerDto) {
    const exists = await this.customerModel.findOne({
      email: authCredentialsCustomerDto.email,
    });

    if (exists) {
      throw new ConflictException('This email is already registerd');
    }

    return await new this.customerModel({
      ...authCredentialsCustomerDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, profileCustomerDto: ProfileCustomerDto) {
    return await this.customerModel.findByIdAndUpdate(id, profileCustomerDto);
  }

  async findById(id: string) {
    return await this.customerModel.findById(id);
  }
}
