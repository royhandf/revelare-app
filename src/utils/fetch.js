import axios from "axios";
import { config } from "../configs";
import { getItem, removeItem, setItem } from "./storage";

export async function searchBooks(query, scenario, page = 1) {
  try {
    const response = await axios.get(
      `${config.api_host}/books/search?query=${query}&scenario=${scenario}&page=${page}`
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

      setItem("token", token);
      setItem("user", user);
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to register");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(
        error.message || "Something went wrong during registration"
      );
    }
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

      setItem("token", token);
      setItem("user", user);
      return response.data;
    } else {
      throw new Error(response.data.message || "Something went wrong");
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error("Invalid email or password.");
      } else {
        throw new Error(error.response.data.error || "Something went wrong.");
      }
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
}

export async function getData() {
  try {
    const token = getItem("token");

    if (!token) {
      removeItem("user");
      removeItem("token");
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
    const token = getItem("token");

    if (!token) {
      removeItem("user");
      removeItem("token");
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
    const token = getItem("token");

    if (!token) {
      removeItem("user");
      removeItem("token");
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
    const token = getItem("token");

    if (!token) {
      removeItem("user");
      removeItem("token");
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
    const token = getItem("token");

    if (!token) {
      removeItem("user");
      removeItem("token");
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

export async function getUsers() {
  try {
    const token = getItem("token");

    if (!token) {
      removeItem("user");
      removeItem("token");
      throw new Error("Unauthorized");
    }

    const response = await axios.get(`${config.api_host}/dashboard/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch users");
    }
  } catch (error) {
    throw error;
  }
}

export async function updateUser(id, data) {
  try {
    const token = getItem("token");

    if (!token) {
      removeItem("user");
      removeItem("token");
      throw new Error("Unauthorized");
    }

    const response = await axios.put(
      `${config.api_host}/dashboard/users/edit/${id}`,
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
      throw new Error(response.data.message || "Failed to update user");
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const token = getItem("token");

    if (!token) {
      removeItem("user");
      removeItem("token");
      throw new Error("Unauthorized");
    }

    const response = await axios.delete(
      `${config.api_host}/dashboard/users/delete/${id}`,
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
      throw new Error(response.data.message || "Failed to delete user");
    }
  } catch (error) {
    throw error;
  }
}

export async function getUserForEdit(id) {
  try {
    const token = getItem("token");

    if (!token) {
      removeItem("user");
      removeItem("token");
      throw new Error("Unauthorized");
    }

    const response = await axios.get(
      `${config.api_host}/dashboard/users/edit/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch user data");
    }
  } catch (error) {
    throw error;
  }
}

export const getUserBookmarks = async (userId) => {
  try {
    const token = getItem("token");

    if (!token) {
      removeItem("user");
      removeItem("token");
      throw new Error("Unauthorized");
    }

    const response = await axios.get(`${config.api_host}/bookmarks/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch bookmarks");
    }
  } catch (error) {
    throw error;
  }
};

export const saveBookmark = async (userId, bookId) => {
  try {
    const token = getItem("token");
    if (!token) {
      removeItem("user");
      removeItem("token");
      throw new Error("Unauthorized");
    }

    console.log(`Requesting: ${config.api_host}/bookmarks/add`);

    const response = await axios.post(
      `${config.api_host}/bookmarks/add`,
      { user_id: userId, book_id: bookId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to add bookmark");
    }
  } catch (error) {
    throw error;
  }
};

export const removeBookmark = async (bookmarkId) => {
  try {
    const token = getItem("token");
    if (!token) {
      removeItem("user");
      removeItem("token");
      throw new Error("Unauthorized");
    }

    const response = await axios.delete(
      `${config.api_host}/bookmarks/delete/${bookmarkId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to remove bookmark");
    }
  } catch (error) {
    throw error;
  }
};
