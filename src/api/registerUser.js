
import axios from "axios";

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/register`, {
      name,
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};