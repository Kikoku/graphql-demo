import Card from '../models/card';
import DataLoader from 'dataloader';

const getCardById = (id) => {
  return Card.findByIdAsync(id)
}

const getCards = () => Card.findAsync()

const cardLoader = new DataLoader(
  keys => Promise.all(keys.map(getCardById)),
  {
    cacheKeyFn: key => {
      return key.toString();
    }
  }
)

const cardsLoader = new DataLoader(
  keys => Promise.all(keys.map(getCards))
)

cardLoader.loadAll = cardsLoader.load.bind(cardsLoader, '__all__')

export default cardLoader;
