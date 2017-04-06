import {
  GraphQLList
} from 'graphql';

import UserType from '../../types/user';

export default {
  type: new GraphQLList(UserType),
  resolve: (user, args, { pool }) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        connection.query('SELECT * FROM user', (err, res) => {
          connection.release();
          if(err) {
            reject(err)
          }
          resolve(res)
        })
      })
    })
  }
};
