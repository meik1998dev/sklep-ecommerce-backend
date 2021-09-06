import { Product } from './product.schema';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

export var purchesed_product = new Schema({
  product: { type: Product, required: true },
  purches_date: { type: Date, required: true },
  seller: { type: Schema.Types.ObjectId, required: true, ref: 'seller' },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
});
