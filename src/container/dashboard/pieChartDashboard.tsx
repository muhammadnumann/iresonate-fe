import React from "react";
import { Pie } from "react-chartjs-2";

import { WSCard } from "src/component/common/card/WSCard";
import { WSTitle } from "src/component/common/title/WSTitle";
import { WSCol } from "src/component/common/WSCol";
import { WSRow } from "src/component/common/WSRow";

import { UserRoleType } from "src/types";
import { Chart_Title } from "src/utils/enums";

import "./piechartDashboard.less";

interface pieChartDashboardProps {
  role?: string;
  dashboardData?: any;
}
const PieChartDashboard: React.FC<pieChartDashboardProps> = ({
  role,
  dashboardData,
}) => {

  
  const numberOfUsers = {
    labels: ["Donors", "Web Hosts", "Content Providers"],
    datasets: [
      {
        data: [
          dashboardData?.dashboardCount?.user,
          dashboardData?.dashboardCount?.vendor,
          dashboardData?.dashboardCount?.contentWriter,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const numberOfEarning = {
    labels: ["iResonate", "Web Hosts", "Content Providers"],
    datasets: [
      {
        data: [
          dashboardData?.dashboardCount?.totalRevenue,
          dashboardData?.dashboardCount?.vendorEarnings,
          dashboardData?.dashboardCount?.contentWriterEarnings,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      position: "left",
      labels: {
        boxWidth: 10,
      },
    },
  };

  return (
  <div className="pie-chart-dashboard">
    <WSRow>
    {role === UserRoleType.Admin && (
        <WSCol xs={24} sm={24} md={11} lg={11} xl={11} xxl={8}>
            <WSTitle level={5}>{Chart_Title.NoOfUser}</WSTitle>
            <WSCard>
              <Pie
                data={numberOfUsers}
                height={250}
                width={400}
                options={pieOptions}
              />
            </WSCard>
            </WSCol>
        )}
      <WSCol xs={24} sm={24} md={11} lg={11} xl={11} xxl={8} className="total-earnings-pia-chart">
        <WSTitle level={5}>{Chart_Title.TotalEarnings}</WSTitle>
        <WSCard>
          <Pie
            data={numberOfEarning}
            height={250}
            width={400}
            options={pieOptions}
          />
        </WSCard>
        </WSCol>
      </WSRow>
    </div>
  );
};

export default PieChartDashboard;
