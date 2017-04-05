import { graphql } from 'graphql';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './graphql';
import cors from 'cors';
import mysql from 'mysql';
import DataLoader from 'dataloader'

let app = express();
const PORT = process.env.PORT || 8080;

if (app.get('env') === 'development') {
  require('dotenv').config();
}

let connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DB,
});

connection.connect((err) => {
  if (err) console.log(err);
});


const getUserById = (id) => (
  new Promise((resolve, reject) => {
    connection.query(`
      SELECT *
      FROM user
      WHERE user.idUser=${id}
    `, (err, res) => {
      if(err) reject(err)
      resolve(res[0])
    })
  })
)

const createLoaders = () => ({
  userLoader: new DataLoader(ids => Promise.all(ids.map(getUserById)))
})

app.use('/', cors(), graphQLHTTP( req => {

  return {
    context: {
      connection,
      ...createLoaders()
    },
    schema: schema,
    pretty: true,
    graphiql: true
  }
}));

app.listen(8080, (err) => {
  console.log(`GraphQL Server is now running on ${PORT}`);
})
