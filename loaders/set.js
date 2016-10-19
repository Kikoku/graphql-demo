import Set from '../models/set';
import DataLoader from 'dataloader';

const getSetById = (id) => {
  return Set.findByIdAsync(id)
}

const getSets = () => Set.findAsync()

const setLoader = new DataLoader(
  keys => Promise.all(keys.map(getSetById)),
  {
    cacheKeyFn: key => {
      return key.toString();
    }
  }
)

const setsLoader = new DataLoader(
  keys => Promise.all(keys.map(getSets))
)

setLoader.loadAll = setsLoader.load.bind(setsLoader, '__all__')

export default setLoader;
