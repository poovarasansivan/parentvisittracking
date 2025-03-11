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
    purpose: "",
  });
  const history = useHistory();

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const token = localStorage.getItem("token");
    if (file) {
      const formData = new FormData();
      formData.append("UploadFiles", file);
      try {
        const uploadResponse = await fetch(
          "http://localhost:8080/protected/uploadpdf",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file");
        }

        const uploadData = await uploadResponse.json();

        const { filename } = uploadData;
        console.log(filename);
        setFormData((prevData) => ({
          ...prevData,
          [name]: filename,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        "http://localhost:8080/protected/addunauthentry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            parent_id: formData.parent_id,
            parent_name: formData.parent_name,
            student_rollno: formData.student_rollno,
            student_name: formData.student_name,
            purpose: formData.purpose,
            id_proof: formData.id_proof,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }
      history.push("/app/manage-unauth-entry");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    history.push("/app/manage-unauth-entry");
  };

  return (
    <>
      <PageTitle>Create a New Unscheduled Visit Request</PageTitle>
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
          <span>Visit Purpose</span>
          <Input
            className="block w-full mt-1"
            name="purpose"
            value={formData.purpose}
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
