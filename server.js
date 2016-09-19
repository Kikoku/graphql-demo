import { graphql } from 'graphql';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './graphql';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/graphql', (err) => {
  if(err) console.error(err)
  else console.log('Mongodb connected')
})

let app = express();
const PORT = process.env.PORT || 8080;

app.use('/', graphQLHTTP({schema: schema, pretty: true, graphiql: true}));

app.listen(8080, (err) => {
  console.log(`GraphQL Server is now running on ${PORT}`);
})
