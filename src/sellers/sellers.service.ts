import { Body, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller, SellerDocument } from 'src/schemas/seller.schema';
import { CreateSellerDto } from './dto/create-seller.dto';

@Injectable()
export class SellersService {
  constructor(
    @InjectModel(Seller.name)
    private readonly sellerModel: Model<SellerDocument>,
  ) {}

  async createSeller(CreateSellerDto: CreateSellerDto) {
    return await new this.sellerModel({
      ...CreateSellerDto,
      createdAt: new Date(),
    }).save();
  }

  async updateSeller(id: string, createSellerDto: CreateSellerDto) {
    return await this.sellerModel.findByIdAndUpdate(id, createSellerDto).exec();
  }

  async findSellerById(id: string) {
    return await this.sellerModel.findById(id);
  }
}
