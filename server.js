import { graphql } from 'graphql';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import Dataloader from 'dataloader';
import createLoaders from './loaders';
import jwt from 'jsonwebtoken';

let app = express();
app.disable('x-powered-by')
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

app.use('/', (req, res, next) => {

  req.viewer = {
    name: 'guest',
    id: 'guest'
  }

  if(req.headers.authorization) {
    try {
      req.viewer = jwt.verify(req.headers.authorization, 'secret')
    } catch(err) {
      // NOTE: Catch errors
    }
  }

  next();
})

app.use('/', cors(), graphQLHTTP( req => {

  return {
    context: {
      ...createLoaders(),
      viewer: req.viewer
    },
    schema: schema,
    pretty: true,
    graphiql: true
  }
}));
