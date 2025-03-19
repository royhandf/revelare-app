import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import Textarea from "../../components/Textarea";
import { addCategory } from "../../utils/fetch";

const Create = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    keywords: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      Swal.fire({
        title: "Validation Error!",
        text: "Category name cannot be empty.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const keywordArray = formData.keywords
      .split(",")
      .map((kw) => kw.trim())
      .filter((kw) => kw !== "");

    if (keywordArray.length === 0) {
      Swal.fire({
        title: "Validation Error!",
        text: "Please enter at least one keyword.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const newData = {
      name: formData.name,
      keywords: keywordArray,
    };

    try {
      const response = await addCategory(newData);

      if (response.status === "success") {
        Swal.fire({
          title: "Success!",
          text: "Category has been successfully created.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard/categories");
        });
      } else {
        throw new Error(
          response.message || "An error occurred while creating the category."
        );
      }
    } catch (error) {
      if (error.message === "Category already exists") {
        Swal.fire({
          title: "Failed!",
          text: "A category with this name already exists.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: error.message || "An unexpected error occurred.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800">Create Category</h2>
      <form method="post" onSubmit={handleSubmit} className="p-4">
        <div className="space-y-4">
          <InputField
            label="Category Name"
            name="name"
            type="text"
            placeholder="Enter category name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />

          <Textarea
            label="Keywords (separated by commas)"
            name="keywords"
            placeholder="Enter keywords, separated by commas"
            value={formData.keywords}
            onChange={(e) => handleChange("keywords", e.target.value)}
          ></Textarea>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button
            type="button"
            onClick={() => navigate("/dashboard/categories")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
          >
            Create Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Create;
