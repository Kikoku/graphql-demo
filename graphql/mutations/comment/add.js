import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import CommentType from '../../types/comment';
import Comment from '../../models/comment'

export default {
  type: CommentType,
  description: 'Add a Comment',
  args: {
    comment: {
      name: 'Comment string',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, args) => {
    let newComment = new Comment({
      comment: args.comment
    })
    newComment.id = newComment._id;
    return new Promise((resolve, reject) => {
      newComment.save((err) => {
        if(err) reject(err)
        else resolve(newComment)
      })
    });
  }
};

// Example addComment
// mutation {
//   addComment(
//     comment: "Mongoed"
//   ){
//     comment
//   }
// }
