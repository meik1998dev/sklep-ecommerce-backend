import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, customerDocument } from 'src/schemas/customer.schema';
import { CustomersDto } from './dto/customers.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<customerDocument>,
  ) {}

  async signup(customersDto: CustomersDto) {
    const exists = await this.customerModel.findOne({
      email: customersDto.email,
    });

    if (exists) {
      throw new ConflictException('This email is already registerd');
    }

    return await new this.customerModel({
      ...customersDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, customersDto: CustomersDto) {
    return await this.customerModel.findByIdAndUpdate(id, customersDto);
  }

  async findById(id: string) {
    return await this.customerModel.findById(id);
  }
}
