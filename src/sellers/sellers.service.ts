import { Body, ConflictException, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { Seller, SellerDocument } from 'src/schemas/seller.schema';
import { CreateSellerDto } from './dto/create-seller.dto';

@Injectable()
export class SellersService {
  constructor(
    @InjectModel(Seller.name)
    private readonly sellerModel: Model<SellerDocument>,
  ) {}

  async signup(createSellerDto: CreateSellerDto) {
    const exists = await this.sellerModel.findOne({
      email: createSellerDto.email,
    });

    if (exists) {
      throw new ConflictException('This email is already registerd');
    }

    return await new this.sellerModel({
      ...CreateSellerDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, createSellerDto: CreateSellerDto) {
    return await this.sellerModel.findByIdAndUpdate(id, createSellerDto).exec();
  }

  async findById(id: string) {
    return await this.sellerModel.findById(id);
  }
}
