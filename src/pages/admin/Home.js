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
import axios from "axios";

export const monthlyappointmentslegends = [
  { title: "Total Appointments", color: "bg-teal-600" },
  { title: "Completed Appointments", color: "bg-purple-600" },
];

function Dashboard() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [barData, setBarData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Total Appointments",
        backgroundColor: "#0694a2",
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0], // Default data
      },
      {
        label: "Completed Appointments",
        backgroundColor: "#7e3af2",
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0], // Default data
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/protected/adminhomedata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response.data!==null)
        {
          setData(response.data);
        }
        else{
          setData([]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const fetchMonthlyData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/protected/appointmentstats",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      processChartData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const processChartData = (data) => {
    const months = [];
    const TotalAppointments = {};
    const CompletedAppointments = {};
  
    // Generate last 6 months dynamically
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const key = date.toISOString().slice(0, 7); // Format: YYYY-MM
      months.push(key);
      TotalAppointments[key] = 0; // Default value
      CompletedAppointments[key] = 0; // Default value
    }
  
    // Fill values from API response
    data.forEach((item) => {
      if (TotalAppointments.hasOwnProperty(item.month)) {
        TotalAppointments[item.month] = item.total_appointments;
        CompletedAppointments[item.month] = item.completed_appointments;
      }
    });
  
    // Update chart data
    setBarData({
      labels: months.map((m) => {
        const date = new Date(m + "-01");
        return date.toLocaleString("default", { month: "long" });
      }),
      datasets: [
        {
          label: "Total Appointments",
          backgroundColor: "#0694a2",
          borderWidth: 1,
          data: months.map((m) => TotalAppointments[m]),
        },
        {
          label: "Completed Appointments",
          backgroundColor: "#7e3af2",
          borderWidth: 1,
          data: months.map((m) => CompletedAppointments[m]),
        },
      ],
    });
  };

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  return (
    <>
      <PageTitle>Home Page</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Appointments" value={data.total_requests}>
          <RoundIcon
            icon={IoMdCodeWorking}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending Appointments" value={data.pending_requests}>
          <RoundIcon
            icon={MdOutlinePendingActions}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Approved Appointments" value={data.approved_requests}>
          <RoundIcon
            icon={RiProgress6Line}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Completed Appointments" value={data.completed_slots}>
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
          <Bar data={barData} />
          <ChartLegend legends={monthlyappointmentslegends} />
        </ChartCard>
      </div>
    </>
  );
}

export default Dashboard;
