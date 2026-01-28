
import axios from "axios";  

export const createUrl = async (urlData) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}url/shorten`,
            urlData, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
