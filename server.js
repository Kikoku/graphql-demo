import { graphql } from 'graphql';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import Dataloader from 'dataloader';
import createLoaders from './loaders';
import jwt from 'jsonwebtoken';
import User from './models/user'

let app = express();
app.disable('x-powered-by');
if (app.get('env') === 'development') {
  require('dotenv').config();
}
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

app.post('/login', (req, res) => {
  const _r = jwt.sign(
    {
      userId: "57e2900d04d8790dc84243f0"
    },
    process.env.REFRESH_SECRET,
    { expiresIn: '30d' }
  );

  res.set({
    '_r': _r
  })
  res.sendStatus(200)
})

app.use((req, res, next) => {

  let _t = req.headers._t;
  let _r = req.headers._r;
  req.viewer = {
    name: 'guest'
  }

  if(!_t) {
    if(_r) {
      try {
        _r = jwt.verify(req.headers._r, process.env.REFRESH_SECRET);
        User.findById(_r.userId)
        .exec((err, user) => {
          if(err) console.log(err)
          req.viewer = user
          res.set({
            _t: jwt.sign(
              user,
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '5m'}
            )
          })
        })
      } catch(err) {
        console.log(err);
      }
    }
  } else {
    try {
      req.viewer = jwt.verify(req.headers._t, process.env.ACCESS_TOKEN_SECRET)._doc
    } catch(err) {
      console.log(err);
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
