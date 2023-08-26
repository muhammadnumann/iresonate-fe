import React from 'react'
import { HeadElement } from 'src/component/core'
// Component
import DashBoardBarData from 'src/container/dashboard'
import SliderComponent from 'src/layouts/MainLayout'
import { withAuth } from 'src/routecheck'
import { UserRoleType } from 'src/types'
// constants
import { dashboard_Title } from 'src/utils/enums'
import metaTitle from 'src/utils/metaTitle'
// style

const DonorDashboard = ({}) => {
  return (
    <>
      <HeadElement title={metaTitle.Dashboard} />
      <SliderComponent>
      <DashBoardBarData dashboardTitle={dashboard_Title.donorDashboard}/>
      </SliderComponent>
    </>
  )
}
export default withAuth(DonorDashboard, UserRoleType.Member);