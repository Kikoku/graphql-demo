import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const deckSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  cards: [{
    quantity: Number,
    name: String,
    colors: Array,
    card_id: {
      type: Schema.ObjectId,
      ref: 'Card'
    },
    board: String,
    _id: false
  }],
  format: {
    type: String,
    required: true
  },
  featured_card: {
    name: String,
    card_id: {
      type: Schema.ObjectId,
      ref: 'Card'
    },
    _id: false
  },
  user_id:  {
    type: Schema.ObjectId,
    ref: 'User'
  },
  tags: [String],
  stars: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  colors: [{
    name: String,
    quantity: Number,
    _id: false
  }],
  edited_at: Date
});

const Deck = mongoose.model('Deck', deckSchema);

Bluebird.promisifyAll(Deck);
Bluebird.promisifyAll(Deck.prototype);

export default Deck;
