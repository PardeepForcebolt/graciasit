import axios from "axios";

const axiosInstance = (baseURL, accessToken = "") =>
  axios.create({
    baseURL,
    headers: {
      authorization: accessToken,
    },
  });

export default axiosInstance;
