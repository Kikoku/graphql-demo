import { graphql } from 'graphql';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './graphql';
import mongoose from 'mongoose';
import DataLoader from 'dataloader';
import { getUserById, getUsers, getTodoById, getTodos } from './loaders';
import cors from 'cors'

mongoose.connect('mongodb://localhost/graphql', (err) => {
  if(err) console.error(err)
  else console.log('Mongodb connected')
})

let app = express();
const PORT = process.env.PORT || 8080;


app.use('/', cors(), graphQLHTTP( req => {

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

  const todoLoader = new DataLoader(
    keys => Promise.all(keys.map(getTodoById)),
    {
      cacheKeyFn: key => {
        return key.toString();
      }
    }
  )

  const todosLoader = new DataLoader(
    keys => Promise.all(keys.map(getTodos))
  )

  todoLoader.loadAll = todosLoader.load.bind(todosLoader)

  const loaders = {
    user: userLoader,
    todo: todoLoader
  }

  // TODO: Pull viewer information from auth_token
  const viewer = {id: "57e2900d04d8790dc84243f0"};

  return {
    context: {
      loaders,
      viewer
    },
    schema: schema,
    pretty: true,
    graphiql: true
  }
}));

app.listen(8080, (err) => {
  console.log(`GraphQL Server is now running on ${PORT}`);
})
