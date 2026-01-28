import axios from "axios"

export const getAllUrls = async (token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}url/getAllUrls`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching URLs:", error);
    throw error.response.data;
  }
};