import { graphql } from '@apollo/client/react/hoc'
import { clientAdmin } from 'pages/_app'
import { CREATE_CONTENT_WRITER, CREATE_VENDOR } from 'src/graphql/Mutations/mutation'

import {
  ContentWriterWithToken,
  MutationCreateContentWriterArgs,
  MutationCreateVendorArgs,
  VendorWithToken,
} from 'src/typeGeneratedAdmin'

export const withNewVendor = graphql<
  any,
  { createVendor: VendorWithToken },
  MutationCreateVendorArgs
>(CREATE_VENDOR, {
  options: { ignoreResults: false, client: clientAdmin },
})
export const withContentWriter = graphql<
  any,
  { createContentWriter: ContentWriterWithToken },
  MutationCreateContentWriterArgs
>(CREATE_CONTENT_WRITER, {
  options: { ignoreResults: false, client: clientAdmin },
})
