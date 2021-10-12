import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(sellerId: string, productDto: ProductDto) {
    return await new this.productModel({ ...productDto, sellerId }).save();
  }

  async update(productId: string, productDto: ProductDto) {
    return await this.productModel.findByIdAndUpdate(productId, productDto);
  }

  async delete(productId: string) {
    return await this.productModel.findByIdAndDelete(productId);
  }

  async findById(id: string) {
    return await this.productModel.findById(id);
  }

  async findAllBySellerId(sellerId: string) {
    return await this.productModel.find({
      sellerId: sellerId,
    });
  }
}
