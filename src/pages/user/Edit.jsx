import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import { getUserForEdit, updateUser } from "../../utils/fetch";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getUserForEdit(id);
        if (result.status === "success") {
          setFormData(result.data);
        } else {
          Swal.fire({
            title: "Failed!",
            text: result.message || "Failed to fetch user data.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "An unexpected error occurred.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateUser(id, formData);
      if (response.status === "success") {
        Swal.fire({
          title: "Success!",
          text: "User updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate(-1);
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: response.message || "Failed to update user.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "An unexpected error occurred.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800">Edit User</h2>
      <form method="post" onSubmit={handleSubmit} className="p-4">
        <div className="space-y-4">
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="Enter user name"
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter user email"
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter new password (leave blank to keep current)"
            value={formData.password || ""}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
