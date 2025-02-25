import React, { useState, useEffect } from "react";
import InfoCard from "../../components/Cards/InfoCard";
import ChartCard from "../../components/Chart/ChartCard";
import { Bar } from "react-chartjs-2";
import ChartLegend from "../../components/Chart/ChartLegend";
import PageTitle from "../../components/Typography/PageTitle";
import RoundIcon from "../../components/RoundIcon";
import { IoMdCodeWorking } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { RiProgress6Line } from "react-icons/ri";
import {Button} from "@windmill/react-ui";
import SectionTitle from "../../components/Typography/SectionTitle";
export const monthlyappointmentslegends = [
  { title: "Total Monthlt Appointments", color: "bg-teal-600" },
  { title: "Completed Appointments", color: "bg-purple-600" },
];

function Dashboard() {
  const [data, setData] = useState([]);
  const monthlyappointments = {
    data: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Total Montly Appointments",
          backgroundColor: "#0694a2",
          // borderColor: window.chartColors.red,
          borderWidth: 1,
          data: [40, 20, 25, 36, 30, 40, 20],
        },
        {
          label: "Completed Appointments",
          backgroundColor: "#7e3af2",
          // borderColor: window.chartColors.blue,
          borderWidth: 1,
          data: [30, 15, 20, 30, 25, 30, 14],
        },
      ],
    },
    options: {
      responsive: true,
    },
    legend: {
      display: false,
    },
  };

  return (
    <>
      <PageTitle>Home Page</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Appointments" value="63">
          <RoundIcon
            icon={IoMdCodeWorking}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending Appointments" value="46">
          <RoundIcon
            icon={MdOutlinePendingActions}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Approved Appointments" value="37">
          <RoundIcon
            icon={RiProgress6Line}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Completed Appointments" value="30">
          <RoundIcon
            icon={FaRegCheckCircle}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <PageTitle>Analytics</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Monthly Appointments">
          <Bar {...monthlyappointments} />
          <ChartLegend legends={monthlyappointmentslegends} />
        </ChartCard>
        <div>
         <SectionTitle>Quick Actions</SectionTitle>
          <Button size="large" className="mr-2">Send Appointment Alerts</Button>
          <Button size="large">Download All Request</Button>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
