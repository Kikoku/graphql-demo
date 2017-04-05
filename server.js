import { graphql } from 'graphql';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './graphql';
import cors from 'cors';
import mysql from 'mysql';
import DataLoader from 'dataloader'


let connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: 'bb7ff83606dc2b',
  password: 'd35ace17',
  database: 'heroku_7b1fd0bb898f151',
});

connection.connect((err) => {
  if (err) console.log(err);
});

let app = express();
const PORT = process.env.PORT || 8080;


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
