import { graphql } from 'graphql';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './src/schema';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';

mongoose.connect('mongodb://localhost/graphql', (err) => {
  if(err) console.error(err)
  else console.log('Mongodb connected')
})

let app = express();

if (app.get('env') === 'development') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 8080;


app.use('/', cors(), graphQLHTTP( req => {

  let viewer = {}

  let decoded = jwt.decode(req.headers.authorization, process.env.JWT_SECRET)
  if(decoded) {
    viewer = decoded._doc
  } else {
    viewer = {
      name: 'Anonymous'
    }
  }


  return {
    schema: schema,
    pretty: true,
    graphiql: true,
    rootValue: {
      viewer
    }
  }
}));

app.listen(8080, (err) => {
  console.log(`GraphQL Server is now running on ${PORT}`);
})
