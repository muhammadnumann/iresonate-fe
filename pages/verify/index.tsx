import React, { useEffect } from 'react'

import { useMutation } from '@apollo/client'
import { VERIFY_ACCOUNT } from 'src/graphql/Mutations/mutation'
import ThankYou from 'src/component/thankyou'

export default function VerifyUser({ token }) {
  const [mutate, { loading }] = useMutation(VERIFY_ACCOUNT, {
    onCompleted: () => {},
  })

  useEffect(() => {
    async function fetchMyAPI() {
      await mutate({
        variables: {
          token: token,
        },
      })
    }

    fetchMyAPI()
  }, [token])

  return (
    <>
      <ThankYou loading={loading} />
    </>
  )
}

VerifyUser.getInitialProps = async ({ query }) => {
  const { token } = query
  return { token }
}
