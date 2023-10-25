import axios from "axios";

export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const appAxios = axios.create({
  baseURL: process.env.REACT_APP_WEB_API_URL,
  headers,
});

export default appAxios;
