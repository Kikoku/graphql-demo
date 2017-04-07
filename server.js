import { graphql } from 'graphql';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import Dataloader from 'dataloader';
import createLoaders from './loaders';

let app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/graphql', (err) => {
  if(err){
    console.error(err)
  } else {

    console.log('Mongodb connected');

    app.listen(PORT, (err) => {
      console.log(`GraphQL Server is now running on ${PORT}`);
    })
  }

})

app.use('/', cors(), graphQLHTTP( req => {

  return {
    context: {
      ...createLoaders()
    },
    schema: schema,
    pretty: true,
    graphiql: true
  }
}));
