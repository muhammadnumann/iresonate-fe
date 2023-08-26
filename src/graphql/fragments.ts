import gql from "graphql-tag"

export const UserInfo = gql`
   fragment UserInfo on node {
      createdAt
      updatedAt
      _id
      name
      email
      status
      accountId
      vendorIdentity
   }
`

export const AddressFields = gql`
   fragment AddressFields on Address {
      street
        city
        state
        postalCode
        country
        addressType
        addressType
        apartment
        postboxNumber
   }
`

