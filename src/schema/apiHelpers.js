import DataLoader from 'dataloader';
import User from '../../models/user';
import Todo from '../../models/todo';

const getUserById = (id) => {
  return User.findByIdAsync(id)
}
const userLoader = new DataLoader(
  keys => Promise.all(keys.map(getUserById)),
  {
    cacheKeyFn: key => {
      return key.toString();
    }
  }
)

export default userLoader;

const getTodoById = (id) => Todo.findByIdAsync(id)

export const todoLoader = new DataLoader(
  keys => Promise.all(keys.map(getTodoById)),
  {
    cacheKeyFn: key => {
      return key.toString()
    }
  }
)


export const getObjectById = (type, id) => {

  console.log(type, id);

  const types = {
    user: getUserById,
    todo: getTodoById
  }

  return types[type](id)
}
