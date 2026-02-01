
import axios from 'axios';

export const verifyEmail = async (token) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}user/verify`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const verifyOtpSubmission = async (token, otp) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}user/verify-otp`, { otp }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}