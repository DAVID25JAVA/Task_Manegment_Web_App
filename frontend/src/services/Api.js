// src/services/api.js
import axios from "axios";

// API URL
const APIURL = "http://localhost:4000/api/";

const API = async (method, url, data = {}, token = null) => {
  try {
    const response = await axios({
      method,
      url: APIURL + url,
      data,
      withCredentials: true, // ✅ Sends cookies (for auth token)
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // Optional: Bearer if needed alongside cookies
      },
    });

    if (response) {
      return response.data;
    }
  } catch (error) {
    // ✅ Better logging for debugging CORS/auth issues
    console.error("API Error Details:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: APIURL + url,
      isCORS: error.message.includes("Network Error") || error.message.includes("CORS"),
    });

    // Throw for the caller to handle
    throw error.response?.data || { message: error.message };
  }
};

export default API;
