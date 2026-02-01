import axios from "axios";


export const getUrlAnalytics = async(id,token) => {
    try {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}url/analytics/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }}
        );
        return result.data;
    } catch (error) {
        throw error.response.data;
    }
}