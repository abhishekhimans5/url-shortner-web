
import axios from "axios";

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/register`, {
      name,
      email,
      password
    });
    console.log("Register response:", response);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};