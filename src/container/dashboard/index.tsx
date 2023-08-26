import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import gql from 'graphql-tag'
import {
  DollarOutlined,
  LineChartOutlined,
  UserOutlined,
} from '@ant-design/icons'
// component
import BarChart, { BudgetBarDataProps, tooltipItemProps } from 'src/component/BarChart'
import { WSSelect, WSCol, WSRow, WSDivider, WSCard, WSTitle, WSLoader, WSTable, WSSpace } from 'src/component/common'
import CountCard from '../CountCard/CountCard'
// constant
import { clientAdmin } from 'pages/_app'
import { getCurrentUser, groupByGroup, simplifyArray } from 'src/utils/helper'
import { DataSelection } from 'src/types'
import { dataSelector } from 'src/utils/staticData'
import { Chart_Title, dashboardStaticData, DashboardMessages, DashboardMessagesContentProvider, dashboard_Title, adminSidebar } from 'src/utils/enums'
import { AdminRevenues, Dashboard, DashboardFilter, Roles } from 'src/typeGeneratedAdmin'
import { GET_DASHBOARD_GROUPS } from 'src/graphql/Queries/queries'
// styles
import './dashboardData.less'
interface dashboardProps {
  dashboardTitle?: string
}
interface dashboardCountProps {
  color: string;
  count: string;
  icon: string;
  title: string;
  key: string
}

const currentUser = getCurrentUser()

let temp = ' '
if (currentUser?.role === Roles.Enduser) {
  temp = `${dashboard_Title.totalDonation}`
} else if (currentUser?.role === Roles.Vendor) {
  temp = ` ${dashboard_Title.vendorEarnings} ${dashboard_Title.contentWriterEarnings} ${dashboard_Title.totalContentWriters} ${dashboard_Title.user} `
} else if (currentUser?.role === Roles.ContentWriter) {
  temp = `${dashboard_Title.totalDonation} ${dashboard_Title.contentWriterEarnings} ${dashboard_Title.totalUsers}`
} else if (currentUser?.role === Roles.Admin) {
  temp = `${dashboard_Title.totalDonation} ${dashboard_Title.totalRevenue} ${dashboard_Title.vendorEarnings} 
  ${dashboard_Title.contentWriterEarnings} ${dashboard_Title.contentWriter} ${dashboard_Title.vendor} 
  ${dashboard_Title.user}`
}

const DASHBOARD_COUNT = gql`
  query dashboardCount($filter: DashboardFilter, $userId: String) {
    dashboardCount(filter: $filter, userId: $userId) {
      ${temp}
      totalPayments {
        totalDonation
        totalRevenue
        vendorEarnings
        contentWriterEarnings
        group
      }
      totalVendorRevenues {
        group
        vendorRevenue
        vendorName
        website
      }
      totalCWRevenues {
        group
        cwRevenue
        cwName
        website
      }
      totalAdminRevenues {
        group
        adminRevenue
        website
        cwName
        vendorName
      }
    }
  }
`
const DashBoardBarData: React.FC<dashboardProps> = ({
  dashboardTitle
}) => {
  const [selectedData, setSelectedData] = useState<string>(
    DashboardFilter.Monthly
  )
  const [groupSelect, setGroupSelect] = useState<string>()
  const [dashboardCountCard, setDashboardCountCard] = useState<dashboardCountProps[]>()

  const [barData, setBarData] = useState<BudgetBarDataProps[]>([])

  const [revenueBarData, setRevenueBarData] = useState<BudgetBarDataProps[]>([])
  const [donationLabel, setDonationLabel] = useState<string[]>([])
  const [cpChartLabel, setCPChartLabel] = useState<string[]>([])

  const [donorBarData, setDonorBarData] = useState<BudgetBarDataProps[]>([])
  const [donorChartLabel, setDonorChartLabel] = useState<string[]>([])
  const [
    getDashboard,
    { data: dashboardData, loading: dashboardLoading },
  ] = useLazyQuery(DASHBOARD_COUNT, {
    client: clientAdmin,
  })
  const [getDashboardGroup, { data: dashboardGroupData }] = useLazyQuery(GET_DASHBOARD_GROUPS, {
    client: clientAdmin,
  })
  useEffect(() => {
    getDashboardGroup({
      variables: {
        group: selectedData
      }
    })
  }, [selectedData])

  useEffect(() => {
    if (currentUser?.role === Roles.Admin) {
      getDashboard({
        variables: {
          filter: selectedData,
        },
      })
    } else {
      getDashboard({
        variables: {
          filter: selectedData,
          userId: currentUser?._id,
        },
      })
    }
  }, [selectedData])

  const renderIcon = (key) => {
    switch (key) {
      case dashboard_Title.admin:
        return <UserOutlined />
      case dashboard_Title.contentWriterEarnings:
        return <DollarOutlined />
      case dashboard_Title.totalRevenue:
        return <LineChartOutlined />
      case dashboard_Title.totalContentWriters:
        return <UserOutlined />
      case dashboard_Title.totalUsers:
        return <UserOutlined />
      case dashboard_Title.user:
        return <UserOutlined />
      case dashboard_Title.vendor:
        return <UserOutlined />
      case dashboard_Title.vendorEarnings:
        return <LineChartOutlined />
      case dashboard_Title.contentWriter:
        return <UserOutlined />
      case dashboard_Title.totalDonation:
        return <DollarOutlined />
      default:
        return <DollarOutlined />
    }
  }

  const objectToArray = (obj: Dashboard) => {
    let includeDollarSign = [
      dashboard_Title.totalDonation,
      dashboard_Title.totalRevenue,
      dashboard_Title.contentWriterEarnings,
      dashboard_Title.vendorEarnings,
    ]
    let appendedInArray = []
    for (const property in obj) {
      let parseObj
      if ((property !== dashboardStaticData.totalPayments && property !== dashboardStaticData.typename && property !== dashboardStaticData.totalCWRevenues && property !== dashboardStaticData.totalVendorRevenues && property !== dashboardStaticData.totalAdminRevenues)) {
        parseObj = {
          title: currentUser?.role === Roles.ContentWriter ? DashboardMessagesContentProvider[property] : DashboardMessages[property],
          icon: renderIcon(property),
          count: includeDollarSign.includes(property)
            ? `$ ${obj[property]}`
            : obj[property],
          color: dashboardStaticData.countColour,
        }
      }
      parseObj && appendedInArray.push(parseObj)
    }
    return setDashboardCountCard(appendedInArray)
  }

  useEffect(() => {
    objectToArray(dashboardData?.dashboardCount)
  }, [dashboardData])

  useEffect(() => {
    // TODO:WebHost Data
    const webHostLabels = WebHostRevenueChart(selectedData)?.labels ?? []
    const webHostBarDataPrepare = WebHostRevenueChart(selectedData)?.WeeklyData ?? []
    setDonationLabel(webHostLabels)
    setBarData(webHostBarDataPrepare)
    // TODO:CP Data
    const cpLabel = CPRevenueChart(selectedData)?.labels ?? []
    const cpBarDataPrepare = CPRevenueChart(selectedData)?.WeeklyData ?? []
    setCPChartLabel(cpLabel)
    setRevenueBarData(cpBarDataPrepare)
    // TODO: Donor Data
    setDonorBarData(DonorRevenueData(selectedData))
    setDonorChartLabel(DonorChartLabel(selectedData))
  }, [dashboardData, groupSelect])

  useEffect(() => {
    dashboardGroupData?.dashboardGroups.length && WebHostValues()
  }, [selectedData, dashboardGroupData?.dashboardGroups])

  const WebHostValues = () => {
    switch (selectedData) {
      case DataSelection.Daily:
        setGroupSelect(dashboardGroupData?.dashboardGroups[0])
        break
      case DataSelection.Weekly:
        setGroupSelect(dashboardGroupData?.dashboardGroups[0])
        break
      case DataSelection.Yearly:
        setGroupSelect(dashboardGroupData?.dashboardGroups[0])
        break
      case DataSelection.Monthly:
        setGroupSelect(dashboardGroupData?.dashboardGroups[new Date().getMonth()])
        break
      default:
        return ''
    }
  }

  const WebHostChartOptions = { // WebHost Chart Option
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          maxBarThickness: dashboardStaticData.maxBarThickness,
          barPercentage: 0.7,
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    tooltips: {
      mode: dashboardStaticData.index,
      intersect: true,
      callbacks: {
        label: function (tooltipItem: tooltipItemProps) {
          return webHostTooltipData(selectedData,tooltipItem)
        },
      }
    }
  }

  const webHostTooltipData = (value,tooltipItem) => { // webHostTooltipData
    switch (value) {
      case DataSelection.Daily:
        const dailyTooltipData = groupByGroup(dashboardData?.dashboardCount?.totalVendorRevenues)
        const dailyTooltipItem = dailyTooltipData[groupSelect]?.filter((i)=>  !!i.website)
        return `${dailyTooltipItem[tooltipItem.index]?.website} : ${tooltipItem.yLabel} `;
      case DataSelection.Weekly:
        const weeklyTooltipData = groupByGroup(dashboardData?.dashboardCount?.totalVendorRevenues)
        const weeklyTooltipItem = weeklyTooltipData[groupSelect]?.filter((i)=>  !!i.website)
        return `${weeklyTooltipItem[tooltipItem.index]?.website} : ${tooltipItem.yLabel}`
      case DataSelection.Monthly:
        const monthlyTooltipData = groupByGroup(dashboardData?.dashboardCount?.totalVendorRevenues)
        const monthlyTooltipItem = monthlyTooltipData[groupSelect]?.filter((i)=>  !!i.website)
        return `${monthlyTooltipItem[tooltipItem.index]?.website} : ${tooltipItem.yLabel}`
      case DataSelection.Yearly:
        const yearlyTooltipData = groupByGroup(dashboardData?.dashboardCount?.totalVendorRevenues)
        const yearlyTooltipItem = yearlyTooltipData[groupSelect]?.filter((i)=>  !!i.website)
        return `${yearlyTooltipItem[tooltipItem.index]?.website} : ${tooltipItem.yLabel}`
      default:
        return []
    }
  }

  const CpChartOptions = {   // CP Chart Option
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          maxBarThickness: dashboardStaticData.maxBarThickness,
          barPercentage: 0.7,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    tooltips: {
      mode: dashboardStaticData.index,
      intersect: true,
      callbacks: {
        label: function (tooltipItem: tooltipItemProps) {
          return contentProviderTooltipData(selectedData,tooltipItem)
        }
      }
    }
  }

  const contentProviderTooltipData = (value,tooltipItem) => { // contentProviderTooltipData
    switch (value) {
      case DataSelection.Daily:
        const dailyTooltipData = groupByGroup(dashboardData?.dashboardCount?.totalCWRevenues)
        const dailyTooltipItem = dailyTooltipData[groupSelect]?.filter((i)=>  !!i.website)
        return `${dailyTooltipItem[tooltipItem.index]?.website} : ${tooltipItem.yLabel} `;
      case DataSelection.Weekly:
        const weeklyTooltipData = groupByGroup(dashboardData?.dashboardCount?.totalCWRevenues)
        const weeklyTooltipItem = weeklyTooltipData[groupSelect]?.filter((i)=>  !!i.website)
        return `${weeklyTooltipItem[tooltipItem.index]?.website} : ${tooltipItem.yLabel}`
      case DataSelection.Monthly:
        const monthlyTooltipData = groupByGroup(dashboardData?.dashboardCount?.totalCWRevenues)
        const monthlyTooltipItem = monthlyTooltipData[groupSelect]?.filter((i)=>  !!i.website)
        return `${monthlyTooltipItem[tooltipItem.index]?.website} : ${tooltipItem.yLabel}`
      case DataSelection.Yearly:
        const yearlyTooltipData = groupByGroup(dashboardData?.dashboardCount?.totalCWRevenues)
        const yearlyTooltipItem = yearlyTooltipData[groupSelect]?.filter((i)=>  !!i.website)
        return `${yearlyTooltipItem[tooltipItem.index]?.website} : ${tooltipItem.yLabel}`
      default:
        return []
    }
  }

  const DonorChartOption = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          maxBarThickness: dashboardStaticData.maxBarThickness,
          barPercentage: 0.7,
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  const chartTitle = () => { // WebHost Chart Title
    if (currentUser?.role === Roles.Admin || currentUser?.role === Roles.Vendor) {
      return Chart_Title.webHostRevenue
    } else if (currentUser?.role === Roles.ContentWriter) {
      return Chart_Title.CpRevenues
    } else if (currentUser?.role === Roles.Enduser) {
      return Chart_Title.totalDonation
    }
  }
  // Chart_Title.CpRevenues
  const cpChartTitle = () => {   // CP Chart Title
    if (currentUser?.role === Roles.Admin || currentUser?.role === Roles.Vendor || currentUser?.role === Roles.ContentWriter) {
      return Chart_Title.CpRevenues
    } else if (currentUser?.role === Roles.Enduser) {
      return Chart_Title.donationToContentProviders
    }
  }

  const WebHostRevenueChart = (value) => { // WebHostBar
    switch (value) {
      case DataSelection.Daily:
        if (!groupSelect) return { WeeklyData: [], labels: [] }
        const daily = groupByGroup(dashboardData?.dashboardCount?.totalVendorRevenues)
        const dailyHeading = daily[groupSelect]?.map((i) => currentUser?.role === Roles.Vendor ? i.website !== null ? i.website : '' : i.vendorName !== null && i.website !== null ? i.vendorName : '')
        const dailyVendorRevenues = daily[groupSelect]?.map((i) => i.vendorRevenue)
        const dataVendorRevenues = dailyVendorRevenues?.filter(data => !!data)
        const dailyData = [{
          backgroundColor: dashboardStaticData.barBackgroundColor,
          label: groupSelect,
          borderColor: dashboardStaticData.barBackgroundColor,
          type: dashboardStaticData.bar,
          data: dataVendorRevenues ?? [],
          borderWidth: 1,
        }]
        return { WeeklyData: dailyData, labels: dailyHeading };
      case DataSelection.Weekly:
        if (!groupSelect) return { WeeklyData: [], labels: [] }
        const weekly = groupByGroup(dashboardData?.dashboardCount?.totalVendorRevenues)
        const weeklyHeading = weekly[groupSelect]?.map((i) => currentUser?.role === Roles.Vendor ? i.website !== null ? i.website : '' : i.vendorName !== null && i.website !== null ? i.vendorName : '')
        const weeklyVendorRevenues = weekly[groupSelect]?.map((i) => i.vendorRevenue)
        const dataWeeklyVendorRevenues = weeklyVendorRevenues?.filter(data => !!data)
        const weeklyData = [{
          backgroundColor: dashboardStaticData.barBackgroundColor,// TODO
          label: groupSelect,
          borderColor: dashboardStaticData.barBackgroundColor,// TODO
          type: dashboardStaticData.bar,
          data: dataWeeklyVendorRevenues ?? [],
          borderWidth: 1,
        }]
        return { WeeklyData: weeklyData, labels: weeklyHeading };
      case DataSelection.Yearly:
        if (!groupSelect) return { WeeklyData: [], labels: [] }
        const yearly = groupByGroup(dashboardData?.dashboardCount?.totalVendorRevenues)
        const yearlyHeading = yearly[groupSelect]?.map((i) => currentUser?.role === Roles.Vendor ? i.website !== null ? i.website : '' : i.vendorName !== null && i.website !== null ? i.vendorName : '')
        const yearlyVendorRevenues = yearly[groupSelect]?.map((i) => i.vendorRevenue)
        const dataYearlyVendorRevenues = yearlyVendorRevenues?.filter(data => !!data)
        const yearlyData = [{
          backgroundColor: dashboardStaticData.barBackgroundColor,
          label: groupSelect,
          borderColor: dashboardStaticData.barBackgroundColor,
          type: dashboardStaticData.bar,
          data: dataYearlyVendorRevenues ?? [],
          borderWidth: 1,
        }]
        return { WeeklyData: yearlyData, labels: yearlyHeading };
      case DataSelection.Monthly:
        if (!groupSelect) return { WeeklyData: [], labels: [] }
        const monthly = groupByGroup(dashboardData?.dashboardCount?.totalVendorRevenues)
        const monthlyHeading = monthly[groupSelect]?.map((i) => currentUser?.role === Roles.Vendor ? i.website !== null ? i.website : '' : i.vendorName !== null && i.website !== null ? i.vendorName : '')
        const monthlyVendorRevenues = monthly[groupSelect]?.map((i) => i.vendorRevenue)
        const dataMonthlyVendorRevenues = monthlyVendorRevenues?.filter(data => !!data)
        const chartData = [{
          backgroundColor: dashboardStaticData.barBackgroundColor,
          label: groupSelect,
          borderColor: dashboardStaticData.barBackgroundColor,
          type: dashboardStaticData.bar,
          data: dataMonthlyVendorRevenues ?? [],
          borderWidth: 1,
        }]
        return { WeeklyData: chartData, labels: monthlyHeading }
      default:
        return { WeeklyData: [], labels: [] }
    }
  }

  const CPRevenueChart = (value) => { // CPBar
    switch (value) {
      case DataSelection.Daily:
        if (!groupSelect) return { WeeklyData: [], labels: [] }
        const daily = groupByGroup(dashboardData?.dashboardCount?.totalCWRevenues)
        const dailyHeading = daily[groupSelect]?.map((i) => currentUser?.role === Roles.ContentWriter ? i.website !== null ? i.website : '' : i.cwName !== null && i.website !== null ? i.cwName : '')
        const dailyVendorRevenues = daily[groupSelect]?.map((i) => i.cwRevenue)
        const dataVendorRevenues = dailyVendorRevenues?.filter(data => !!data)
        const dailyData = [{
          backgroundColor: dashboardStaticData.cpBarBackgroundColor,
          label: groupSelect,
          borderColor: dashboardStaticData.cpBarBackgroundColor,
          type: dashboardStaticData.bar,
          data: dataVendorRevenues ?? [],
          borderWidth: 1,
        }]
        return { WeeklyData: dailyData, labels: dailyHeading };
      case DataSelection.Weekly:
        if (!groupSelect) return { WeeklyData: [], labels: [] }
        const weekly = groupByGroup(dashboardData?.dashboardCount?.totalCWRevenues)
        const weeklyHeading = weekly[groupSelect]?.map((i) => currentUser?.role === Roles.ContentWriter ? i.website !== null ? i.website : '' : i.cwName !== null && i.website !== null ? i.cwName : '')
        const weeklyVendorRevenues = weekly[groupSelect]?.map((i) => i.cwRevenue)
        const dataWeeklyVendorRevenues = weeklyVendorRevenues?.filter(data => !!data)
        const weeklyData = [{
          backgroundColor: dashboardStaticData.cpBarBackgroundColor,
          label: groupSelect,
          borderColor: dashboardStaticData.cpBarBackgroundColor,
          type: dashboardStaticData.bar,
          data: dataWeeklyVendorRevenues ?? [],
          borderWidth: 1,
        }]
        return { WeeklyData: weeklyData, labels: weeklyHeading };
      case DataSelection.Yearly:
        if (!groupSelect) return { WeeklyData: [], labels: [] }
        const yearly = groupByGroup(dashboardData?.dashboardCount?.totalCWRevenues)
        const yearlyHeading = yearly[groupSelect]?.map((i) => currentUser?.role === Roles.ContentWriter ? i.website !== null ? i.website : '' : i.cwName !== null && i.website !== null ? i.cwName : '')
        const yearlyVendorRevenues = yearly[groupSelect]?.map((i) => i.cwRevenue)
        const dataYearlyVendorRevenues = yearlyVendorRevenues?.filter(data => !!data)
        const yearlyData = [{
          backgroundColor: dashboardStaticData.cpBarBackgroundColor,
          label: groupSelect,
          borderColor: dashboardStaticData.cpBarBackgroundColor,
          type: dashboardStaticData.bar,
          data: dataYearlyVendorRevenues ?? [],
          borderWidth: 1,
        }]
        return { WeeklyData: yearlyData, labels: yearlyHeading };
      case DataSelection.Monthly:
        if (!groupSelect) return { WeeklyData: [], labels: [] }
        const monthly = groupByGroup(dashboardData?.dashboardCount?.totalCWRevenues)
        const monthlyHeading = monthly[groupSelect]?.map((i) => currentUser?.role === Roles.ContentWriter ? i.website !== null ? i.website : '' : i.cwName !== null && i.website !== null ? i.cwName : '')
        const monthlyVendorRevenues = monthly[groupSelect]?.map((i) => i.cwRevenue)
        const dataMonthlyVendorRevenues = monthlyVendorRevenues?.filter(data => !!data)
        const chartData = [{
          backgroundColor: dashboardStaticData.cpBarBackgroundColor,
          label: groupSelect,
          borderColor: dashboardStaticData.cpBarBackgroundColor,
          type: dashboardStaticData.bar,
          data: dataMonthlyVendorRevenues ?? [],
          borderWidth: 1,
        }]
        return { WeeklyData: chartData, labels: monthlyHeading }
      default:
        return { WeeklyData: [], labels: [] }
    }
  }
  const DonorRevenueData = (value) => {
    switch (value) {
      case DataSelection.Daily:
        return [
          {
            backgroundColor: dashboardStaticData.barBackgroundColor,// TODO
            borderColor: dashboardStaticData.barBackgroundColor,// TODO
            label: dashboardStaticData.totalDonationDolor, // TODO
            type: dashboardStaticData.bar,// TODO
            data: dashboardData?.dashboardCount?.totalPayments.map(
              (item) => item.totalDonation
            ),
            borderWidth: 1,
          },
        ]
      case DataSelection.Weekly:
        return [
          {
            backgroundColor: dashboardStaticData.barBackgroundColor,// TODO
            borderColor: dashboardStaticData.barBackgroundColor,// TODO
            label: dashboardStaticData.totalDonationDolor, // TODO
            type: dashboardStaticData.bar,// TODO
            data: dashboardData?.dashboardCount?.totalPayments.map(
              (item) => item.totalDonation
            ),
            borderWidth: 1,
          },
        ]
      case DataSelection.Yearly:
        return [
          {
            backgroundColor: dashboardStaticData.barBackgroundColor,
            borderColor: dashboardStaticData.barBackgroundColor,
            label: dashboardStaticData.totalDonationDolor,// TODO
            type: dashboardStaticData.bar,
            data: dashboardData?.dashboardCount?.totalPayments.map(
              (item) => item.totalDonation
            ),
            borderWidth: 1,
          },
        ]
      case DataSelection.Monthly:
        return [
          {
            backgroundColor: dashboardStaticData.barBackgroundColor,
            borderColor: dashboardStaticData.barBackgroundColor,
            label: dashboardStaticData.totalDonationDolor,// TODO
            type: dashboardStaticData.bar,
            data: dashboardData?.dashboardCount?.totalPayments.map(
              (item) => item.totalDonation
            ),
            borderWidth: 1,
          },
        ]
      default:
        return []
    }
  }
  const DonorChartLabel = (value) => {
    switch (value) {
      case DataSelection.Daily:
        return simplifyArray(
          dashboardData?.dashboardCount?.totalPayments,
          dashboardStaticData.group
        )
      case DataSelection.Weekly:
        return simplifyArray(
          dashboardData?.dashboardCount?.totalPayments,
          dashboardStaticData.group
        )
      case DataSelection.Yearly:
        return simplifyArray(
          dashboardData?.dashboardCount?.totalPayments,
          dashboardStaticData.group// TODO
        )
      case DataSelection.Monthly:
        return simplifyArray(
          dashboardData?.dashboardCount?.totalPayments,
          dashboardStaticData.group
        )
      default:
        return []
    }
  }

  const webSiteUrl = (record: AdminRevenues) => {
    const handleClick = () => {
      window.open(record.website);
    };
    return (
      <div className="website-url-text" onClick={handleClick}> {record?.website}</div>
    )
  }
  const columns = [
    {
      title: dashboardStaticData.blogURL,
      render: (record: AdminRevenues) => webSiteUrl(record)
    },
    {
      title: adminSidebar.contentProviders,
      render: (record: AdminRevenues) => record?.cwName ? record?.cwName : "-"
    },
    {
      title: dashboardStaticData.revenue,
      render: (record: AdminRevenues) => record?.adminRevenue ? `$ ${record?.adminRevenue}` : "-"
    },
  ]

  currentUser?.role !== Roles.Vendor && columns.splice(2, 0, {
    title: adminSidebar.webHost,
    render: (record: AdminRevenues) => record?.vendorName ? record?.vendorName : "-"
  })
  return (
    <>
      {dashboardLoading ? (
        <WSLoader className="d-flex justify-content-center align-items-center h-100vh" />
      ) : (
        <div className='dashboard-data'>
          <WSTitle level={5} className='dashboard-title'>
            {dashboardTitle}
          </WSTitle>
          <WSDivider />
          <div className='dashboard-count'>
            <WSRow gutter={[16, 10]} className='dashboard-count-row'>
              {currentUser?.role === Roles.Enduser &&
                dashboardCountCard?.map(
                  ({ title, count, icon, color, key }) => {
                    return (
                      <WSCol xs={24} sm={12} md={10} lg={10} xl={8} xxl={6} key={key}>
                        <CountCard
                          title={title}
                          count={count}
                          icon={icon}
                          color={color}
                          key={key}
                        />
                      </WSCol>
                    )
                  }
                )}
              {currentUser?.role === Roles.Admin &&
                dashboardCountCard?.map(
                  ({ title, count, icon, color, key }) => {
                    return (
                      <WSCol xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} key={key}>
                        <CountCard
                          title={title}
                          count={count}
                          icon={icon}
                          color={color}
                          key={key}
                        />
                      </WSCol>
                    )
                  }
                )}
              {currentUser?.role === Roles.Vendor &&
                dashboardCountCard?.map(
                  ({ title, count, icon, color, key }) => {
                    return (
                      <WSCol xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} key={key}>
                        <CountCard
                          title={title}
                          count={count}
                          icon={icon}
                          color={color}
                          key={key}
                        />
                      </WSCol>
                    )
                  }
                )}
              {currentUser?.role === Roles.ContentWriter &&
                dashboardCountCard?.map(
                  ({ title, count, icon, color, key }) => {
                    return (
                      <WSCol xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} key={key}>
                        <CountCard
                          title={title}
                          count={count}
                          icon={icon}
                          color={color}
                          key={key}
                        />
                      </WSCol>
                    )
                  }
                )}
              <WSDivider />
            </WSRow>
          </div>
          <div className='dashboard-card'>
            <div className='meta-title'>
              <WSTitle level={5}>{chartTitle()}</WSTitle>
              <div className='monthly-select-main'>
                <WSSpace>
                  <WSSelect
                    name='selector'
                    data={dataSelector}
                    value={selectedData}
                    onSelectItem={(value: string) => {
                      setSelectedData(value)
                    }}
                  />
                  {currentUser?.role !== Roles.Enduser && <WSSelect
                    name='selector'
                    data={dashboardGroupData && dashboardGroupData?.dashboardGroups?.map((item: string) => { return { title: item, id: item } })}
                    value={groupSelect}
                    onSelectItem={(value: string) => {
                      setGroupSelect(value)
                    }}
                  />}
                </WSSpace>
              </div>
            </div>
            {currentUser?.role == Roles.Enduser &&  // Donor Chart
              <WSCard>
                <BarChart
                  data={donorBarData || []}
                  options={DonorChartOption}
                  labels={donorChartLabel}
                  height={300}
                />
              </WSCard>
            }
            {(currentUser?.role == Roles.Admin || currentUser?.role == Roles.Vendor) && ( // WebHost Chart
              <WSCard>
                <BarChart
                  data={barData || []}
                  options={WebHostChartOptions}
                  labels={donationLabel}
                  height={300}
                />
              </WSCard>)}
            {currentUser?.role !== Roles.Enduser && <>
              {currentUser?.role != Roles.ContentWriter && <div className='dashboard-card-2'>
                <WSTitle level={5}>{cpChartTitle()}</WSTitle>
              </div>}
              <WSCard className='dashboard-card-2'>
                <BarChart   // CP Chart
                  data={revenueBarData || []}
                  options={CpChartOptions}
                  labels={cpChartLabel}
                  height={300}
                />
              </WSCard>
            </>}
            <>
              <div className='dashboard-card-2'>
                <WSTitle level={5}>{Chart_Title.Top10ContentProviderBlogs}</WSTitle>
              </div>
              <WSCard className='dashboard-card-2'>
                <WSTable
                  columns={columns}
                  loading={dashboardLoading}
                  bordered
                  dataSource={currentUser?.role === Roles.Enduser ? dashboardData?.dashboardCount.totalAdminRevenues.filter((i) => i.adminRevenue) :
                    dashboardData?.dashboardCount.totalAdminRevenues.filter(data => data.group === `${groupSelect}`).filter((i) => i.adminRevenue)}
                  />
                  
                </WSCard> </>
              
          </div>
          {/* {currentUser?.role != Roles.Enduser && ( TODO:need this code
            <PieChartDashboard
              role={currentUser?.role}
              dashboardData={dashboardData && dashboardData}
            />
          )} */}
        </div>
      )}
    </>
  )
}

export default DashBoardBarData
