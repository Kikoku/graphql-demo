import {
  GraphQLList
} from 'graphql';

import UserType from '../../types/user';
import User from '../../models/user'

export default {
  type: new GraphQLList(UserType),
  resolve: () => {
    return new Promise((resolve, reject) => {
      User.find().populate({
        path: 'friends',
        model: 'User',
        populate: {
          path: 'friends',
          model: 'User',
          populate: {
            path: 'friends',
            model: 'User',
            populate: {
              path: 'friends',
              model: 'User'
            }
          }
        }
      }).exec((err, users) => {
        if(err) reject(err)
        else resolve(users)
      });
    });
  }
}
