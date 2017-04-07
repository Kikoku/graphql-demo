import User from '../models/user';
import DataLoader from 'dataloader';

const getUserById = (id) => {
  return User.findByIdAsync(id)
}

const createUserLoader = () => new DataLoader(
  keys => Promise.all(keys.map(getUserById)),
  {
    cacheKeyFn: key => {
      return key.toString();
    }
  }
)

export default createUserLoader;
