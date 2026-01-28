import axios from "axios"

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}