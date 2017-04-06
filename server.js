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

let config = {
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DB,
  connectionLimit: 10
}

let pool = mysql.createPool(config);

pool.on('acquire', (connection) => {
  console.log(`Connection ${connection.threadId} aquired`);
})

pool.on('release', (connection) => {
  console.log(`Connection ${connection.threadId} released`);
})

const getUserById = (id) => (
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      connection.query(`
        SELECT *
        FROM user
        WHERE user.idUser=${id}
      `, (err, res) => {
        connection.release();
        if(err) reject(err)
        resolve(res[0])
      })
    })
  })
)

const getFriendsById = (id) => (
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      connection.query(`
        SELECT *
        FROM friends
        WHERE friends.friendA=${id} OR friends.friendB=${id}
      `, (err, res) => {
        connection.release();
        if(err) reject(err);
        resolve(res)
      })
    })
  })
)

const createLoaders = () => ({
  userLoader: new DataLoader(ids => Promise.all(ids.map(getUserById))),
  friendsLoader: new DataLoader(ids => Promise.all(ids.map(getFriendsById)))
})

app.use('/', cors(), graphQLHTTP( req => {

  return {
    context: {
      pool,
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
