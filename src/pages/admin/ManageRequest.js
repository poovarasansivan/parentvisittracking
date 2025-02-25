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

const visitrequestdata = [
  {
    req_id: "PR-1",
    parent_id: "P011",
    parent_name: "John Doe",
    parent_email: "parent@gmail.com",
    parent_contact: "9876543210",
    id_proof: "Aadhar-Card.pdf",
    student_rollno: "211CS246",
    student_name: "Praveen Kumar R",
    student_email: "praveenkumar.cs21@bitsathy.ac.in",
    student_contact: "9876543210",
    student_department: "CSE",
    student_year: "3",
    mentor_id: "CS3232",
    mentor_name: "Dr. S. Sathish Kumar",
    booked_time: "2021-09-20 10:00:00",
    visit_purpose: "General Visit",
    check_in_time: "2021-09-20 10:00:00",
    check_out_time: "2021-09-20 12:00:00",
    visit_status: "1",
  },
];

function VisitRequestTable() {
  const [visitrequest, setVisitRequestdata] = useState(visitrequestdata);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [rowDataToEdit, setRowDataToEdit] = useState(null);
  const history = useHistory();
  const resultsPerPage = 8;
  const totalResults = visitrequest.length;

  const [page, setPage] = useState(1);

  const headers = [
    { label: "Request ID", key: "req_id" },
    { label: "Parent ID", key: "parent_id" },
    { label: "Parent Name", key: "parent_name" },
    { label: "Parent Email", key: "parent_email" },
    { label: "Parent Contact", key: "parent_contact" },
    { label: "ID Proof", key: "id_proof" },
    { label: "Student Rollno", key: "student_rollno" },
    { label: "Student Name", key: "student_name" },
    { label: "Student Email", key: "student_email" },
    { label: "Student Contact", key: "student_contact" },
    { label: "Student Department", key: "student_department" },
    { label: "Year", key: "student_year" },
    { label: "Mentor ID", key: "mentor_id" },
    { label: "Mentor Name", key: "mentor_name" },
    { label: "Booked Time", key: "booked_time" },
    { label: "Visit Purpose", key: "visit_purpose" },
    { label: "Check In Time", key: "check_in_time" },
    { label: "Check Out Time", key: "check_out_time" },
    { label: "Status", key: "visit_status" },
  ];

  useEffect(() => {
    setFilteredData(
      visitrequest.filter((request) => {
        const statusText =
          request.visit_status === "1"
            ? "Approved"
            : request.visit_status === "2"
            ? "Rejected"
            : "Pending";
        return visitrequest.filter(
          (request) =>
            (request.req_id &&
              request.req_id
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
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
            (request.student_rollno &&
              request.student_rollno
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (request.student_name &&
              request.student_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (request.student_email &&
              request.student_email
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (request.student_contact &&
              request.student_contact
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (request.student_department &&
              request.student_department
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (request.student_year &&
              request.student_year
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
            (request.booked_time &&
              request.booked_time
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (request.visit_purpose &&
              request.visit_purpose
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (request.check_in_time &&
              request.check_in_time
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (request.check_out_time &&
              request.check_out_time
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
    console.log(req_id, status);
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
            <Button onClick={handleAddnew}>
              <CiCirclePlus size={24} className="mr-2 font-bold" />
              Add New
            </Button>
            <CSVLink
              data={filteredData}
              headers={headers}
              filename="visit_requests.csv"
            >
              <Button size="large" className="ml-4">
                <FaDownload size={20} className="mr-2" /> Export
              </Button>
            </CSVLink>
          </div>
        </div>
        <hr className="border-t-1 w-full" />

        <Table>
          <TableHeader>
            <tr>
              <TableCell>S No</TableCell>
              <TableCell>Request ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Parent Email</TableCell>
              <TableCell>Parent Contact</TableCell>
              <TableCell>ID Proof</TableCell>
              <TableCell>Student Rollno</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Student Email</TableCell>
              <TableCell>Student Contact</TableCell>
              <TableCell>Student Department</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Mentor ID</TableCell>
              <TableCell>Mentor Name</TableCell>
              <TableCell>Booked Time</TableCell>
              <TableCell>Visit Purpose</TableCell>
              <TableCell>Check IN</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Visit Status</TableCell>
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
                  <TableCell>{request.id_proof}</TableCell>
                  <TableCell>{request.student_rollno}</TableCell>
                  <TableCell>{request.student_name}</TableCell>
                  <TableCell>{request.student_email}</TableCell>
                  <TableCell>{request.student_contact}</TableCell>
                  <TableCell>{request.student_department}</TableCell>
                  <TableCell>{request.student_year}</TableCell>
                  <TableCell>{request.mentor_id}</TableCell>
                  <TableCell>{request.mentor_name}</TableCell>
                  <TableCell>{request.booked_time}</TableCell>
                  <TableCell>{request.visit_purpose}</TableCell>
                  <TableCell>{request.check_in_time}</TableCell>
                  <TableCell>{request.check_out_time}</TableCell>
                  <TableCell>
                    {request.visit_status === "1" ? (
                      <Badge type="success">Approved</Badge>
                    ) : request.visit_status === "2" ? (
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
            <p className="text-sm font-medium">ID Proof: </p>
            <p className="ml-2">{rowDataToEdit?.id_proof}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Student Rollno: </p>
            <p className="ml-2">{rowDataToEdit?.student_rollno}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Student Name: </p>
            <p className="ml-2">{rowDataToEdit?.student_name}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Student Email: </p>
            <p className="ml-2">{rowDataToEdit?.student_email}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium mr-2">Student Contact: </p>
            <p className="ml-2">{rowDataToEdit?.student_contact}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Department: </p>
            <p className="ml-2">{rowDataToEdit?.student_department}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Student Year: </p>
            <p className="ml-2">{rowDataToEdit?.student_year}</p>
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
            <p className="text-sm font-medium">Booked Time: </p>
            <p className="ml-2">{rowDataToEdit?.booked_time}</p>
          </div>

          <div className="flex flex-row">
            <p className="text-sm font-medium">Visit Purpose: </p>
            <p className="ml-2">{rowDataToEdit?.visit_purpose}</p>
          </div>

          <div className="flex flex-row">
            <p className="text-sm font-medium">Check IN Time: </p>
            <p className="ml-2">{rowDataToEdit?.check_in_time}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Check Out Time: </p>
            <p className="ml-2">{rowDataToEdit?.check_out_time}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Status: </p>
            <p className="ml-2">
              {rowDataToEdit?.visit_status === "1" ? (
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
