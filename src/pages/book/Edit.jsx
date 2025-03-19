import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputField from "../../components/InputField";
import Textarea from "../../components/Textarea";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import { getBookForEdit, updateBook } from "../../utils/fetch";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    editors: "",
    publisher: "",
    published: "",
    isbn: "",
    pdf_link: null,
    cover_link: null,
    description: "",
    table_of_contents: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const result = await getBookForEdit(id);
        if (result.status === "success") {
          console.log(result.data);

          setFormData(result.data);
        } else {
          Swal.fire({
            title: "Failed!",
            text:
              result.message ||
              "An error occurred while fetching the book data.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text:
            error.message || "An error occurred while fetching the book data.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await updateBook(id, data);

      if (response.status === "success") {
        Swal.fire({
          title: "Success!",
          text: "Book has been successfully updated.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate(-1);
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text:
            response.message || "An error occurred while updating the book.",
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
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800">Edit Book</h2>
      <form
        method="post"
        onSubmit={handleSubmit}
        className="p-4 md:p-3"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-4">
            <InputField
              label="Title"
              name="title"
              type="text"
              placeholder="Add title here"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />

            <InputField
              label="Authors (Name; Name; ...)"
              name="authors"
              type="text"
              placeholder="Add authors here"
              value={formData.authors}
              onChange={(e) => handleChange("authors", e.target.value)}
            />

            <InputField
              label="Editors (Name; Name; ...)"
              name="editors"
              type="text"
              placeholder="Add editors here"
              value={formData.editors}
              onChange={(e) => handleChange("editors", e.target.value)}
            />

            <InputField
              label="Publisher"
              name="publisher"
              type="text"
              placeholder="Add publisher here"
              value={formData.publisher}
              onChange={(e) => handleChange("publisher", e.target.value)}
              required
            />

            <InputField
              label="Year of Publication"
              name="published"
              type="number"
              placeholder="Add year here"
              value={formData.published}
              onChange={(e) => handleChange("published", e.target.value)}
              required
            />

            <InputField
              label="ISBN"
              name="isbn"
              type="text"
              placeholder="Add ISBN here"
              value={formData.isbn}
              onChange={(e) => handleChange("isbn", e.target.value)}
              required
            />

            <InputField
              label="Book File (PDF)"
              name="pdf_link"
              type="file"
              accept=".pdf"
              maxSize={50 * 1024 * 1024}
              onChange={(e) => handleChange("pdf_link", e.target.files[0])}
              required
            />
            {formData.pdf_link && (
              <p className="text-sm text-gray-500">
                Current file:{" "}
                <a
                  href={formData.pdf_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View PDF
                </a>
              </p>
            )}

            <InputField
              label="Cover Image"
              name="cover_link"
              type="file"
              accept="image/*"
              maxSize={2 * 1024 * 1024}
              onChange={(e) => handleChange("cover_link", e.target.files[0])}
              required
            />
            {formData.cover_link && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Current Cover:</p>
                <img
                  src={formData.cover_link}
                  alt="Book Cover"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Textarea
              label="Description"
              name="description"
              placeholder="Write a description here"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            ></Textarea>

            <Textarea
              label="Table of Contents"
              name="table_of_contents"
              placeholder="Write a table of contents here"
              value={formData.table_of_contents}
              onChange={(e) =>
                handleChange("table_of_contents", e.target.value)
              }
            ></Textarea>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button
            type="button"
            onClick={() => navigate(-1, { state: { refresh: true } })}
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
