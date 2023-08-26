import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

// component
import { HeadElement } from 'src/component/core'
import SliderComponent from 'src/layouts/MainLayout'
import { clientAdmin } from 'pages/_app'
import { WSButton, WSModal, WSTitle } from 'src/component/common'

// constant
import {
  getBankProfileCompletedStatus,
  localStorageRemoveItem,
} from 'src/utils/helper'
import DashBoardBarData from 'src/container/dashboard'
import metaTitle from 'src/utils/metaTitle'
// Schema
import { GET_BANK_URL_VERIFICATION } from 'src/graphql/Queries/queries'

const Dashboard = (props) => {
  const [bankStatus, setBankStatus] = useState(false)
  const getBankProfile = getBankProfileCompletedStatus()

  const [getWebsiteUrl, { loading }] = useLazyQuery(
    GET_BANK_URL_VERIFICATION,

    {
      client: clientAdmin,
      onCompleted: (data) => {
        location.replace(data?.getUrlForBankVerification)
        setBankStatus(false)
        localStorageRemoveItem('stripeAccountStatus')
      },
    }
  )
  useEffect(() => {
    if (!getBankProfile) {
      setBankStatus(true)
    }
    if (getBankProfile == null) {
      setBankStatus(false)
    }
  }, [])

  const okFunction = async () => {
    await getWebsiteUrl({
      variables: {
        country: 'us',
      },
    })
  }

  return (
    <>
      <SliderComponent>
        <HeadElement title={metaTitle.Dashboard} />
        <div className='dashboard'>
          <WSTitle />
          <DashBoardBarData />
          <WSModal
            visible={bankStatus}
            footerFunction={[
              <div className="d-flex justify-content-center" key="dashboard">
                <WSButton type='primary' loading={loading} onClick={okFunction}>
                  Add Bank Account
                </WSButton>
              </div>,
            ]}
            className='vender-delete-model'
          >
            <>Add your bank account details by clicking below button</>
          </WSModal>
        </div>
      </SliderComponent>
    </>
  )
}

export default Dashboard
