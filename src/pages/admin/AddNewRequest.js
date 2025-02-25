import React, { useState } from "react";
import { Input, Label, Button, Select } from "@windmill/react-ui";
import PageTitle from "../../components/Typography/PageTitle";
import { useHistory } from "react-router-dom";

function ProjectRequestForm() {
  const [formData, setFormData] = useState({
    parent_id: "",
    parent_name: "",
    student_rollno: "",
    student_name: "",
    booked_time: "",
    visit_purpose: "",
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    history.push("/app/manage-visit-request");
  };

  const handleCancel = () => {
    history.push("/app/manage-visit-request");
  };

  return (
    <>
      <PageTitle>Create a New Visit Request</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Parent ID</span>
          <Input
            placeholder="PA101"
            className="block w-full mt-1"
            name="parent_id"
            value={formData.parent_id}
            onChange={handleChange}
          />
        </Label>

        <Label className="mt-4">
          <span>Parent Name</span>
          <Input
            placeholder="John Doe"
            className="block w-full mt-1"
            name="parent_name"
            value={formData.parent_name}
            onChange={handleChange}
          />
        </Label>

        <Label className="mt-4">
          <span>Student Roll No</span>
          <Input
            placeholder="211CS246"
            className="block w-full mt-1"
            name="student_rollno"
            value={formData.student_rollno}
            onChange={handleChange}
          />
        </Label>

        <Label className="mt-4">
          <span>Student Name</span>
          <Input
            placeholder="Praveen Kumar R"
            className="block w-full mt-1"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
          />
        </Label>

        
        <Label className="mt-4">
          <span>Booked Time</span>
          <Input
            type="datetime-local"
            className="block w-full mt-1"
            name="booked_time"
            value={formData.booked_time}
            onChange={handleChange}
          />
        </Label>

        <Label className="mt-4">
          <span>Visit Purpose</span>
          <Input
            className="block w-full mt-1"
            name="visit_purpose"
            value={formData.visit_purpose}
            onChange={handleChange}
          />
        </Label>

        <Label className="mt-4">
          <span>ID Proof</span>
          <Input
            className="block w-full mt-1"
            type="file"
            name="id_proof"
            onChange={handleFileChange}
          />
        </Label>
        <div className="flex mt-4">
          <Button onClick={handleSubmit}>Submit</Button>
          <Button className="ml-4" layout="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProjectRequestForm;
