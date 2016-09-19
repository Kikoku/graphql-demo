import { graphql } from 'graphql';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import Schema from './schema';

let app = express();
const PORT = process.env.PORT || 8080;

app.use('/', graphQLHTTP({schema: Schema, pretty: true, graphiql: true}));

app.listen(8080, (err) => {
  console.log(`GraphQL Server is now running on ${PORT}`);
})
