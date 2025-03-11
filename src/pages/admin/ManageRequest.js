import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination,
  Input,
} from "@windmill/react-ui";
import { IoMdEye } from "react-icons/io";
import { EditIcon, TrashIcon } from "../../icons";
import PageTitle from "../../components/Typography/PageTitle";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { Label } from "@windmill/react-ui";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa6";
import axios from "axios";

function VisitRequestTable() {
  const [visitrequest, setVisitRequestdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [rowDataToEdit, setRowDataToEdit] = useState(null);
  const history = useHistory();
  const resultsPerPage = 8;
  const totalResults = visitrequest.length || 0;

  const [page, setPage] = useState(1);

  const headers = [
    { label: "Request ID", key: "req_id" },
    { label: "Parent ID", key: "parent_id" },
    { label: "Parent Name", key: "parent_name" },
    { label: "Parent Email", key: "parent_email" },
    { label: "Parent Contact", key: "parent_contact" },
    { label: "Student Rollno", key: "roll_no" },
    { label: "Student Name", key: "name" },
    { label: "Student Email", key: "email" },
    { label: "Student Department", key: "department" },
    { label: "Year", key: "year" },
    { label: "Mentor ID", key: "mentor_id" },
    { label: "Mentor Name", key: "mentor_name" },
    { label: "Mentor Name", key: "mentor_email" },
    { label: "Booked Time", key: "booked_time" },
    { label: "Visit Purpose", key: "purpose" },
    { label: "Check In Time", key: "check_in" },
    { label: "Check Out Time", key: "check_out" },
    { label: "ID Proof", key: "id_proof" },
    { label: "Visit Status", key: "slot_status" },
    { label: "Request Status", key: "status" },
  ];

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  let url = "";
  if (role === "1" || role === "4" || role === "3") {
    url = "http://localhost:8080/protected/getappointments";
  } else {
    url = "http://localhost:8080/protected/getmentorwiseappointments";
  }

  useEffect(() => {
    const fetchvisitdata = async () => {
      try {
        if(role==="2"){
          const response = await axios.post(url,{
            mentor_id:localStorage.getItem("userid")
          } ,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
          if (response.data !== null) {
            setVisitRequestdata(response.data);
          } else {
            setVisitRequestdata([]);
          }
        }
        else {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data !== null) {
            setVisitRequestdata(response.data);
          } else {
            setVisitRequestdata([]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchvisitdata();
  }, []);

  useEffect(() => {
    setFilteredData(
      visitrequest.filter((request) => {
        const statusText =
          request.status === "1"
            ? "Approved"
            : request.status === "2"
            ? "Rejected"
            : "Pending";

        return (
          (request.req_id &&
            request.req_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (request.parent_id &&
            request.parent_id
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.parent_name &&
            request.parent_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.parent_email &&
            request.parent_email
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.parent_contact &&
            request.parent_contact
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.roll_no &&
            request.roll_no.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (request.name &&
            request.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (request.email &&
            request.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (request.year && // ✅ Convert year to string before using toLowerCase()
            request.year
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.department &&
            request.department
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.mentor_id &&
            request.mentor_id
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.mentor_name &&
            request.mentor_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.mentor_email &&
            request.mentor_email
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.booked_time &&
            request.booked_time
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.purpose &&
            request.purpose.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (request.check_out &&
            request.check_out
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.check_in &&
            request.check_in
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          statusText.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }, [searchTerm, visitrequest]);

  function openViewModal(rowData) {
    setRowDataToEdit(rowData);
    setIsViewModalOpen(true);
  }

  function openDeleteModal(rowData) {
    setRowDataToEdit(rowData);
    setIsDeleteModalOpen(true);
  }
  const handleAddnew = () => {
    history.push("/app/add-new-request");
  };
  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function handleDelete() {
    const updatedRequests = visitrequest.filter(
      (request) => request.req_id !== rowDataToEdit.req_id
    );
    setVisitRequestdata(updatedRequests);
    closeDeleteModal();
  }

  function handlePageChange(p) {
    setPage(p);
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  const handleRequestApproval = async (req_id, status) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/protected/ApproveAppointments",
        {
          req_id: req_id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        const updatedRequests = visitrequest.map((request) => {
          if (request.req_id === req_id) {
            return {
              ...request,
              status: status,
            };
          }
          return request;
        }); 
  
        setVisitRequestdata(updatedRequests);
        setIsViewModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handlecheckin = async (req_id, status) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/protected/handlecheckin",
        {
          req_id: req_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
        setIsViewModalOpen(false);
  
    } catch (error) {
      console.log(error);
    }
  };

  const handlecheckout = async (req_id, status) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/protected/handlecheckout",
        {
          req_id: req_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        setIsViewModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <PageTitle>Visit Request Details </PageTitle>

      <TableContainer className="mb-8">
        <div className="m-4 flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <div className="flex flex-row">
            {role === "3" && (
              <Button onClick={handleAddnew}>
                <CiCirclePlus size={24} className="mr-2 font-bold" />
                Add New
              </Button>
            )}
            {(role === "1" || role === "2") && (
              <CSVLink
                data={filteredData.map((item) => ({
                  ...item,
                  id_proof: `http://localhost:8080/servepdf/${item.id_proof}`,
                }))}
                headers={headers}
                filename="visit_requests.csv"
              >
                <Button size="large" className="ml-4">
                  <FaDownload size={20} className="mr-2" /> Export
                </Button>
              </CSVLink>
            )}
          </div>
        </div>
        <hr className="border-t-1 w-full" />

        <Table>
          <TableHeader>
            <tr>
              <TableCell>S No</TableCell>
              <TableCell>Request ID</TableCell>
              <TableCell>Parent ID</TableCell>
              <TableCell>Parent Name</TableCell>
              <TableCell>Parent Email</TableCell>
              <TableCell>Parent Contact</TableCell>
              <TableCell>Student Rollno</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Student Email</TableCell>
              <TableCell>Student Department</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Mentor ID</TableCell>
              <TableCell>Mentor Name</TableCell>
              <TableCell>Mentor Email</TableCell>
              <TableCell>Booked Time</TableCell>
              <TableCell>Visit Purpose</TableCell>
              <TableCell>ID Proof</TableCell>
              <TableCell>Check IN</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Visit Status</TableCell>
              <TableCell>Request Status</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredData
              .slice((page - 1) * resultsPerPage, page * resultsPerPage)
              .map((request, index) => (
                <TableRow key={index + 1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{request.req_id}</TableCell>
                  <TableCell>{request.parent_id}</TableCell>
                  <TableCell>{request.parent_name}</TableCell>
                  <TableCell>{request.parent_email}</TableCell>
                  <TableCell>{request.parent_contact}</TableCell>
                  <TableCell>{request.roll_no}</TableCell>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.department}</TableCell>
                  <TableCell>{request.year} Year</TableCell>
                  <TableCell>{request.mentor_id}</TableCell>
                  <TableCell>{request.mentor_name}</TableCell>
                  <TableCell>{request.mentor_email}</TableCell>
                  <TableCell>{request.booked_time}</TableCell>
                  <TableCell>{request.purpose}</TableCell>
                  <TableCell>{request.id_proof}</TableCell>
                  <TableCell>{request.check_in}</TableCell>
                  <TableCell>{request.check_out}</TableCell>
                  <TableCell>
                    {request.slot_status === "1" ? (
                      <Badge type="success">Visited</Badge>
                    ) : (
                      <Badge type="warning">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {request.status === "1" ? (
                      <Badge type="success">Approved</Badge>
                    ) : request.status === "2" ? (
                      <Badge type="danger">Rejected</Badge>
                    ) : (
                      <Badge type="warning">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="View"
                        onClick={() => openViewModal(request)}
                      >
                        <IoMdEye className="w-5 h-5" />
                      </Button>
                      {(role === "1" || role === "2" || role === "3") && (
                        <>
                          <Button
                            layout="link"
                            size="icon"
                            aria-label="Delete"
                            onClick={() => openDeleteModal(request)}
                          >
                            <TrashIcon className="w-5 h-5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={handlePageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>Are you sure you want to delete this request?</ModalBody>
        <ModalFooter>
          <Button layout="link" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </ModalFooter>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <ModalHeader>View Request Details</ModalHeader>
        <ModalBody>
          {/* Display request details */}
          <div className="flex flex-row">
            <p className="text-sm font-medium">Request ID: </p>
            <p className="ml-2">{rowDataToEdit?.req_id}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Parent ID: </p>
            <p className="ml-2">{rowDataToEdit?.parent_id}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Parent Name: </p>
            <p className="ml-2">{rowDataToEdit?.parent_name}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Parent Email: </p>
            <p className="ml-2">{rowDataToEdit?.parent_email}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Parent Contact: </p>
            <p className="ml-2">{rowDataToEdit?.parent_contact}</p>
          </div>

          <div className="flex flex-row">
            <p className="text-sm font-medium">Student Rollno: </p>
            <p className="ml-2">{rowDataToEdit?.roll_no}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Student Name: </p>
            <p className="ml-2">{rowDataToEdit?.name}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Student Email: </p>
            <p className="ml-2">{rowDataToEdit?.email}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Department: </p>
            <p className="ml-2">{rowDataToEdit?.department}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Student Year: </p>
            <p className="ml-2">{rowDataToEdit?.year} Year</p>
          </div>

          <div className="flex flex-row">
            <p className="text-sm font-medium">Mentor ID: </p>
            <p className="ml-2">{rowDataToEdit?.mentor_id}</p>
          </div>

          <div className="flex flex-row">
            <p className="text-sm font-medium">Mentor name: </p>
            <p className="ml-2">{rowDataToEdit?.mentor_name}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Mentor Email: </p>
            <p className="ml-2">{rowDataToEdit?.mentor_email}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Booked Time: </p>
            <p className="ml-2">{rowDataToEdit?.booked_time}</p>
          </div>

          <div className="flex flex-row">
            <p className="text-sm font-medium">Visit Purpose: </p>
            <p className="ml-2">{rowDataToEdit?.purpose}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">ID Proof: </p>
            {rowDataToEdit?.id_proof && (
              <a
                href={`http://localhost:8080/servepdf/${rowDataToEdit.id_proof}`}
                target="_blank"
                className="ml-2 text-blue-500 underline"
              >
                View ID Proof
              </a>
            )}
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Check IN Time: </p>
            <p className="ml-2">{rowDataToEdit?.check_in}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Check Out Time: </p>
            <p className="ml-2">{rowDataToEdit?.check_out}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Status: </p>
            <p className="ml-2">
              {rowDataToEdit?.status === "1" ? (
                <Badge type="success">Approved</Badge>
              ) : rowDataToEdit?.status === "2" ? (
                <Badge type="danger">Rejected</Badge>
              ) : (
                <Badge type="warning">Pending</Badge>
              )}
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          {(role === "1" || role === "2") && (
            <>
              <Button
                layout="link"
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => handleRequestApproval(rowDataToEdit.req_id, "1")}
              >
                <p className="text-white">Approve</p>
              </Button>
              <Button
                layout="link"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleRequestApproval(rowDataToEdit.req_id, "2")}
              >
                <p className="text-white">Reject</p>
              </Button>
            </>
          )}
          {role === "4" && (
            <>
              <Button
                layout="link"
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => handlecheckin(rowDataToEdit.req_id, "1")}
              >
                <p className="text-white">Check In</p>
              </Button>
              <Button
                layout="link"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => handlecheckout(rowDataToEdit.req_id, "2")}
              >
                <p className="text-white">Check Out</p>
              </Button>
            </>
          )}
          <Button
            layout="link"
            className="bg-gray-600 text-white hover:bg-gray-700"
            onClick={() => setIsViewModalOpen(false)}
          >
            <p className="text-white">Close</p>
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default VisitRequestTable;
