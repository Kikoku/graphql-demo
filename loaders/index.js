import createUserLoader from './user';

const createLoaders = () => ({
  userLoader: createUserLoader(),
})

export default createLoaders
