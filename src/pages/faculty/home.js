import React, { useState, useEffect } from "react";
import InfoCard from "../../components/Cards/InfoCard";
import PageTitle from "../../components/Typography/PageTitle";
import RoundIcon from "../../components/RoundIcon";
import { IoMdCodeWorking } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { RiProgress6Line } from "react-icons/ri";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from "@windmill/react-ui";
import axios from "axios";

const recentappointments = [
  {
    req_id: "PR101",
    parent_id: "PA101",
    parent_name: "John Doe",
    student_rollno: "123456",
    student_name: "Jane Doe",
    booked_time: "25-02-2025 12:00 PM",
    visit_purpose: "General Meeting",
    visit_status: "1",
  },
  {
    req_id: "PR102",
    parent_id: "PA102",
    parent_name: "Jane Doe",
    student_rollno: "123457",
    student_name: "John Doe",
    booked_time: "25-02-2025 01:00 PM",
    visit_purpose: "General Meeting",
    visit_status: "0",
  },
];

function Dashboard() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [cardData, setCardData] = useState([]);
  const resultsPerPage = 5;
  const totalResults = recentappointments.length || 0;

  const token = localStorage.getItem("token");
  const mentor_id = localStorage.getItem("userid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/protected/getfacultyhomedata",
          {
            mentor_id: mentor_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCardData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/protected/getfacultywiseappointments",
          {
            mentor_id: mentor_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data != null) {
          setData(response.data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTableData();
  }, []);

  function onPageChange(p) {
    setPage(p);
  }
  useEffect(() => {
    setData(
      recentappointments.slice(
        (page - 1) * resultsPerPage,
        page * resultsPerPage
      )
    );
  }, [page]);

  return (
    <>
      <PageTitle>Home Page</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Appointments" value={cardData.total_request}>
          <RoundIcon
            icon={IoMdCodeWorking}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Pending Appointments"
          value={cardData.total_pending_request}
        >
          <RoundIcon
            icon={MdOutlinePendingActions}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Approved Appointments"
          value={cardData.approved_request}
        >
          <RoundIcon
            icon={RiProgress6Line}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Completed Appointments"
          value={cardData.completed_request}
        >
          <RoundIcon
            icon={FaRegCheckCircle}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <PageTitle>Upcoming Week Appointments</PageTitle>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>S No</TableCell>
              <TableCell>Request ID</TableCell>
              <TableCell>Parent ID</TableCell>
              <TableCell>Parent Name</TableCell>
              <TableCell>Student Rollno</TableCell>
              <TableCell>Student Name </TableCell>
              <TableCell>Booked Time</TableCell>
              <TableCell>Visit Purpose</TableCell>
              <TableCell>Status</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{user.req_id}</TableCell>
                <TableCell>{user.parent_id}</TableCell>
                <TableCell>{user.parent_name}</TableCell>
                <TableCell>{user.student_rollno}</TableCell>
                <TableCell>{user.student_name}</TableCell>
                <TableCell>{user.booked_time}</TableCell>
                <TableCell>{user.purpose}</TableCell>
                <TableCell>
                  {user.status === "1" ? (
                    <Badge type="success">Approved</Badge>
                  ) : user.status === "2" ? (
                    <Badge type="danger">Rejected</Badge>
                  ) : (
                    <Badge type="warning">Pending</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default Dashboard;
