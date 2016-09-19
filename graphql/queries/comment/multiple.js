import {
  GraphQLList
} from 'graphql';

import CommentType from '../../types/comment';
import Comment from '../../models/comment'

export default {
  type: new GraphQLList(CommentType),
  resolve: () => {
    return new Promise((resolve, reject) => {
      Comment.find((err, comments) => {
        if(err) reject(err)
        else resolve(comments)
      })
    });
  }
}

// Exmample query
// {
//   todos {
//     title,
//     id,
//     completed
//   }
// }
