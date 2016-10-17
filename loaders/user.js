import User from '../models/user';
import DataLoader from 'dataloader';

const getUserById = (id) => {
  console.log(id);
  return User.findByIdAsync(id)
}

const getUsers = () => User.findAsync()

const userLoader = new DataLoader(
  keys => Promise.all(keys.map(getUserById)),
  {
    cacheKeyFn: key => {
      return key.toString();
    }
  }
)

const usersLoader = new DataLoader(
  keys => Promise.all(keys.map(getUsers))
)

userLoader.loadAll = usersLoader.load.bind(usersLoader, '__all__')

export default userLoader;
