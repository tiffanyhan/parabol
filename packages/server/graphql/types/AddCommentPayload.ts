import {GraphQLNonNull, GraphQLObjectType} from 'graphql'
import {GQLContext} from '../graphql'
import Comment from './Comment'
import makeMutationPayload from './makeMutationPayload'

export const AddCommentSuccess = new GraphQLObjectType<any, GQLContext>({
  name: 'AddCommentSuccess',
  fields: () => ({
    comment: {
      type: GraphQLNonNull(Comment),
      description: 'the comment just created',
      resolve: async ({commentId}, _args, {dataLoader}) => {
        return dataLoader.get('comments').load(commentId)
      }
    }
  })
})

const AddCommentPayload = makeMutationPayload('AddCommentPayload', AddCommentSuccess)

export default AddCommentPayload
