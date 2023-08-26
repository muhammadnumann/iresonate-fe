import { graphql } from '@apollo/client/react/hoc'
import { clientAdmin } from 'pages/_app'
import { UPDATE_CONTENT_WRITER } from 'src/graphql/Mutations/mutation'

import {
  ContentWriterWithToken,
  MutationUpdateContentWriterArgs,
  Response,
} from 'src/typeGeneratedAdmin'

export const withUpdateContentWriter = graphql<
  any,
  { updateContentWriter: ContentWriterWithToken },
  MutationUpdateContentWriterArgs
>(UPDATE_CONTENT_WRITER, {
  options: { ignoreResults: false, client: clientAdmin},
})
