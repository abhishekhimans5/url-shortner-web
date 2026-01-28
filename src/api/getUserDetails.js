import axios from "axios";
export const getUserDetails = async (token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}user/details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};