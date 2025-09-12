import axios from "axios";
// import { store } from "../store/store";
// import { logout } from "../slice/authSlice"; // adjust path if different

// Common JSON header
const commonHeader = {
  "Content-Type": "application/json",
};

// Get token from localStorage
export async function getAccessToken() {
  try {
    return localStorage.getItem("token") || "";
  } catch (error) {
    console.error("Error getting access token:", error);
    return "";
  }
}

// Core request handler
async function call(options) {
  try {
    const token = await getAccessToken();

    const response = await axios({
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : undefined, // attach Bearer token if exists
      },
    });

    return response.data;
  } catch (error) {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Invalid token"
    )
    throw error.response?.data || error;
  }
}

export async function fetcherPost(url, data, options = {}) {
  const isFormData = data instanceof FormData;

  return call({
    url,
    method: "POST",
    data,
    headers: isFormData
      ? { ...options.headers }
      : { ...commonHeader, ...options.headers },
  });
}

export async function fetcherPut(url, data, options = {}) {
  return call({ url, method: "PUT", data, headers: { ...commonHeader, ...options.headers } });
}

export async function fetcherPatch(url, data, options = {}) {
  return call({ url, method: "PATCH", data, headers: { ...commonHeader, ...options.headers } });
}

export async function fetcherDelete(url, data, options = {}) {
  return call({ url, method: "DELETE", data, headers: { ...commonHeader, ...options.headers } });
}

export async function fetcherGet(url, params, options = {}) {
  return call({ url, method: "GET", params, headers: { ...commonHeader, ...options.headers } });
}

// 🔹 Utility: Convert file -> Base64 string
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
