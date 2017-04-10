import { graphql } from 'graphql';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import Dataloader from 'dataloader';
import createLoaders from './loaders';
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)

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

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use((req, res, next) => {
  var views = req.session.views;

  if(!views) {
    views = req.session.views = {};
  }

  views['page'] = (views['page'] || 0) + 1;

  next()
})

app.use('/', cors(), graphQLHTTP( (req, res) => {

  return {
    context: {
      ...createLoaders()
    },
    schema: schema,
    pretty: true,
    graphiql: true
  }
}));
