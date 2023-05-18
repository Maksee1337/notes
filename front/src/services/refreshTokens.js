import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const refreshTokens = async refreshToken => {
    try {
        const response = await axios.post(apiUrl + '/auth/refreshToken', {refreshToken});
        return response.data;
    } catch (e) {
        return null
    }
}

export default refreshTokens;
