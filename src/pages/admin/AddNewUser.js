import React, { useState } from "react";
import { Input, Label, Button, Select } from "@windmill/react-ui";
import { FaUser } from "react-icons/fa";
import PageTitle from "../../components/Typography/PageTitle";
import { useHistory } from "react-router-dom";

function Addnewusers() {
  const [formData, setFormData] = useState({
    userid: "",
    username: "",
    email: "",
    mobile: "",
    role: "",
  });
  const history = useHistory();

  // Handle form field changes
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
    history.push("/app/manage-users");
  };

  const handleCancel = () => {
    history.push("/app/manage-users");
  };

  return (
    <>
      <PageTitle>Create a New User</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>User ID</span>
          <Input
            className="block w-full mt-1"
            placeholder="PA101"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            icon={FaUser}
          />
        </Label>

        {/* Faculty Name */}
        <Label className="mt-4">
          <span>User Name</span>
          <Input
            className="block w-full mt-1"
            placeholder="Praveen Kumar R"
            name="username"
            value={formData.username}
            onChange={handleChange}
            icon={FaUser}
          />
        </Label>
        <Label className="mt-4">
          <span>Email</span>
          <Input
            className="block w-full mt-1"
            placeholder="abc@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Label>
        <Label className="mt-4">
          <span>Mobile</span>
          <Input
            className="block w-full mt-1"
            placeholder="1234567890"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </Label>
        <Label className="mt-4">
          <span>Role</span>
          <Select
            className="block w-full mt-1"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="1">Admin</option>
            <option value="2">Faculty</option>
            <option value="3">Security</option>
            <option value="4">Parents</option>
          </Select>
        </Label>

        <Button className="mt-4" onClick={handleSubmit}>
          Submit
        </Button>
        <Button className="ml-4" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
}

export default Addnewusers;
