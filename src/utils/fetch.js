import axios from "axios";
import { config } from "../configs";

export async function searchBooks(query, page = 1) {
  try {
    const response = await axios.get(
      `${config.api_host}/books/search?query=${query}&page=${page}`
    );

    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "Something went wrong");
    }
  } catch (error) {
    throw error;
  }
}

export async function getBookById(id) {
  try {
    const response = await axios.get(`${config.api_host}/books/${id}`, {
      withCredentials: true,
    });

    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "Something went wrong");
    }
  } catch (error) {
    throw error;
  }
}

export async function signup(data) {
  try {
    const response = await axios.post(`${config.api_host}/signup`, {
      ...data,
    });

    if (response.data.status === "success") {
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to register");
    }
  } catch (error) {
    throw error;
  }
}

export async function signin(email, password) {
  try {
    const response = await axios.post(`${config.api_host}/signin`, {
      email,
      password,
    });

    if (response.data.status === "success") {
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return response.data;
    } else {
      throw new Error(response.data.message || "Something went wrong");
    }
  } catch (error) {
    throw error;
  }
}

export async function getData() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      throw new Error("Unauthorized");
    }

    const response = await axios.get(`${config.api_host}/dashboard/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch books");
    }
  } catch (error) {
    throw error;
  }
}

export async function addBook(data) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      throw new Error("Unauthorized");
    }

    const response = await axios.post(
      `${config.api_host}/dashboard/books/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to add book");
    }
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "An error occurred");
    } else {
      throw new Error(error.message || "An unknown error occurred");
    }
  }
}

export async function updateBook(id, data) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      throw new Error("Unauthorized");
    }

    const response = await axios.put(
      `${config.api_host}/dashboard/books/edit/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to update book");
    }
  } catch (error) {
    throw error;
  }
}

export async function getBookForEdit(id) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      throw new Error("Unauthorized");
    }

    const response = await axios.get(
      `${config.api_host}/dashboard/books/edit/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch book data");
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteBook(id) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      throw new Error("Unauthorized");
    }

    const response = await axios.delete(
      `${config.api_host}/dashboard/books/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to delete book");
    }
  } catch (error) {
    throw error;
  }
}
