import { graphql } from 'graphql';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './graphql';
import mongoose from 'mongoose';
import DataLoader from 'dataloader';
import { getUserById, getUsers } from './loaders'

mongoose.connect('mongodb://localhost/graphql', (err) => {
  if(err) console.error(err)
  else console.log('Mongodb connected')
})

let app = express();
const PORT = process.env.PORT || 8080;

app.use('/', graphQLHTTP( req => {

  const cacheMap = new Map();

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

  const loaders = {
    user: userLoader
  }

  return {
    context: { loaders },
    schema: schema,
    pretty: true,
    graphiql: true
  }
}));

app.listen(8080, (err) => {
  console.log(`GraphQL Server is now running on ${PORT}`);
})
