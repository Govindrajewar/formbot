import axios from "axios";
import { BACKEND_URL } from "../deploymentLink";

const Login = (email, password) => {
  return axios.post(`${BACKEND_URL}/login`, { email, password });
};

const Register = (userName, email, password) => {
  return axios.post(`${BACKEND_URL}/signup`, { userName, email, password });
};

export { Login, Register };
