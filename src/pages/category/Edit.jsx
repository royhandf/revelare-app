import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import { getCategoryForEdit, updateCategory } from "../../utils/fetch";
import Textarea from "../../components/Textarea";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    keywords: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result = await getCategoryForEdit(id);
        if (result.status === "success") {
          setFormData({
            name: result.data.name,
            keywords: result.data.keywords.join(", "),
          });
        } else {
          Swal.fire({
            title: "Failed!",
            text:
              result.message ||
              "An error occurred while fetching the category data.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text:
            error.message ||
            "An error occurred while fetching the category data.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: formData.name,
      keywords: formData.keywords.split(",").map((kw) => kw.trim()),
    };

    try {
      const response = await updateCategory(id, updatedData);

      if (response.status === "success") {
        Swal.fire({
          title: "Success!",
          text: "Category has been successfully updated.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard/categories");
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text:
            response.message ||
            "An error occurred while updating the category.",
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
      <h2 className="text-2xl font-semibold text-gray-800">Edit Category</h2>
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
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
