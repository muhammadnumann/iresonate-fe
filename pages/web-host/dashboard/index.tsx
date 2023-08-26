import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
// Component
import { HeadElement } from 'src/component/core'
import { WSButton, WSModal } from 'src/component/common'
import DashBoardBarData from 'src/container/dashboard'
import SliderComponent from 'src/layouts/MainLayout'
// constants
import { withAuth } from 'src/routecheck'
import { UserRoleType } from 'src/types'
import { dashboard_Title, formLabelName, LOCAL_STORAGE_KEY } from 'src/utils/enums'
import metaTitle from 'src/utils/metaTitle'
import { getBankProfileCompletedStatus, localStorageRemoveItem } from 'src/utils/helper'
import { GET_BANK_URL_VERIFICATION } from 'src/graphql/Queries/queries'
import { clientAdmin } from 'pages/_app'

const WebHostDashboard = ({ }) => {
  const [bankStatus, setBankStatus] = useState(false)
  const getBankProfile = getBankProfileCompletedStatus()

  const [getWebsiteUrl, { loading }] = useLazyQuery(
    GET_BANK_URL_VERIFICATION,

    {
      client: clientAdmin,
      onCompleted: (data) => {
        location.replace(data?.getUrlForBankVerification)
        setBankStatus(false)
        localStorageRemoveItem(LOCAL_STORAGE_KEY.STRIPE_ACCOUNT_STATUS)
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
      <HeadElement title={metaTitle.Dashboard} />
      <SliderComponent>
        <WSModal
          visible={bankStatus}
          footerFunction={[
            <div className="d-flex justify-content-center" key="dashboard">
              <WSButton type='primary' loading={loading} onClick={okFunction}>
                {formLabelName.addBankAccount}
              </WSButton>
            </div>
          ]}
          className='vender-delete-model'
        >
          <>{formLabelName.addBankAccountDetails}</>
        </WSModal>
        <DashBoardBarData dashboardTitle={dashboard_Title.webHostDashboard} />
      </SliderComponent>
    </>
  )
}
export default withAuth(WebHostDashboard, UserRoleType.Vendor);