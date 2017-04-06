import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import UserType from '../../types/user';

const addUser = {
  type: UserType,
  description: 'Create a new user',
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (_, { name }, { pool, userLoader }) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        connection.query(`
          INSERT INTO user (name)
          VALUES ('${name}')
        `, (err, res) => {
          connection.release();
          if(err) {
            reject(err)
          }
          userLoader.prime(res.insertId, { name })
          resolve({
            idUser: res.insertId,
            name
          })
        })
      })
    })
  }
}

export default addUser;
