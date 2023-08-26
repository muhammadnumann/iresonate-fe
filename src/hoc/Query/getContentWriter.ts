import { graphql } from '@apollo/client/react/hoc'
import { WithRouterProps } from 'next/dist/client/with-router'
import { clientAdmin } from 'pages/_app'
import { GET_USER_DETAIL_BY_TOKEN } from 'src/graphql/Queries/queries'
import {
  QueryGetUserDetailByTokenArgs,
  UserWithToken,
} from 'src/typeGeneratedAdmin'

export const withGetContentWriter = graphql<
  WithRouterProps,
  { getUserDetailByToken: UserWithToken },
  QueryGetUserDetailByTokenArgs
>(GET_USER_DETAIL_BY_TOKEN, {
  options: (props) => {
    // props.router.
    return {
      client: clientAdmin,
      ignoreResults: false,
      variables: {
        token: '3d1d5dda-2a6e-4927-8160-fe8304ca1e42',
      },
    }
  },
})
