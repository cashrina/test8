import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'https://test8-ec556-default-rtdb.europe-west1.firebasedatabase.app/'

});

export default axiosApi;