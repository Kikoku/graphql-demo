import {
  GraphQLList
} from 'graphql';
import userLoader from '../../../loaders/user'

import UserType from '../../types/user';

export default {
  type: new GraphQLList(UserType),
  resolve: (user, args, { connection, userLoader }) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user', (err, res) => {
        if(err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
};
