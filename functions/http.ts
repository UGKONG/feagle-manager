import axios from "axios";

const config = {
  baseURL: "https://feagle.gabia.io/api",
  timeout: 10000,
};
const http = axios.create(config);

export default http;
