import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import CommentType from '../../types/comment';
import Comment from '../../models/comment';

export default {
  type: CommentType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, options) {
    return Comment.findById(params.id).exec();
  }
};

// Exmample query
// {
//   comment(id: 1) {
//     title,
//     id,
//     completed
//   }
// }
