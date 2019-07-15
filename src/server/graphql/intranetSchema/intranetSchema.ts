import {GraphQLObjectType, GraphQLSchema} from 'graphql'
import autopauseUsers from 'server/graphql/intranetSchema/mutations/autopauseUsers'
import endOldMeetings from 'server/graphql/intranetSchema/mutations/endOldMeetings'
import sendBatchNotificationEmails from 'server/graphql/intranetSchema/mutations/sendBatchNotificationEmails'
import pingActionTick from 'server/graphql/intranetSchema/queries/pingActionTick'
import suCountTiersForUser from 'server/graphql/queries/suCountTiersForUser'
import suUserCount from 'server/graphql/queries/suUserCount'
import suProOrgInfo from 'server/graphql/queries/suProOrgInfo'
import suOrgCount from 'server/graphql/queries/suOrgCount'
import sendUpcomingInvoiceEmails from 'server/graphql/intranetSchema/mutations/sendUpcomingInvoiceEmails'
import addNewFeature from 'server/graphql/intranetSchema/mutations/addNewFeature'
import user from 'server/graphql/intranetSchema/queries/user'
import flagOverLimit from 'server/graphql/intranetSchema/mutations/flagOverLimit'
import runScheduledJobs from 'server/graphql/intranetSchema/mutations/runScheduledJobs'
import {GQLContext} from 'server/graphql/graphql'

const query = new GraphQLObjectType<any, GQLContext, any>({
  name: 'Query',
  fields: () => ({
    pingActionTick,
    suCountTiersForUser,
    suUserCount,
    suProOrgInfo,
    suOrgCount,
    user
  })
})

const mutation = new GraphQLObjectType<any, GQLContext, any>({
  name: 'Mutation',
  fields: () => ({
    addNewFeature,
    autopauseUsers,
    endOldMeetings,
    flagOverLimit,
    runScheduledJobs,
    sendBatchNotificationEmails,
    sendUpcomingInvoiceEmails
  })
})

export default new GraphQLSchema({query, mutation})