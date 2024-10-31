/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
const domain = process.env.BASE_URL as string;

const axiosClient = axios.create({
  baseURL: domain,
});

export default axiosClient;
