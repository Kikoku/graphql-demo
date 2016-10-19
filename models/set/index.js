import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const setSchema = new Schema({
  name: String,
  set_code: String,
  release_date: Date,
  description: String,
  common: Number,
  uncommon: Number,
  rare: Number,
  mythic_rare: Number,
  basic_land: Number,
  other: Number,
  total: Number,
  block: String,
  type: String,
  card_ids: Array
});

const Set = mongoose.model('Set', setSchema);

Bluebird.promisifyAll(Set);
Bluebird.promisifyAll(Set.prototype);

export default Set;
