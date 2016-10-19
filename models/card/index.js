import mongoose, { Schema } from 'mongoose';
import Promise from 'bluebird';
// import slug from 'mongoose-slug'; todo: use mongoose-slug-urls
// import mongoosePaginate from 'mongoose-paginate';

// TODO: add card.print

const cardSchema = new Schema({
  multiverse_id: Number,
  name: {
    type: String,
    required: true
  },
  cost: String,
  cmc: Number,
  type: String,
  subtype: String,
  rarity: String,
  set_code: String,
  set_id: {
    type: Schema.ObjectId,
    ref: 'Set'
  },
  oracle: String,
  flavor: String,
  number: Number,
  side: {
    type: String,
    default: ''
  },
  artist: String,
  power: String,
  toughness: String,
  loyalty: Number,
  related_card_id: Number,
  colors: [String],
  formats: [{
    name: String,
    legality: String,
    _id: false
  }],
  rulings: [{
    released_at: Date,
    rule: String,
    _id: false
  }],
  released_at: Date
});

const Card = mongoose.model('Card', cardSchema);

Promise.promisifyAll(Card);
Promise.promisifyAll(Card.prototype);

export default Card;
