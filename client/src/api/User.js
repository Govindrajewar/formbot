import axios from "axios";
import { BACKEND_URL } from "../deploymentLink";

const Login = (email, password) => {
  return axios.post(`${BACKEND_URL}/login`, { email, password });
};

const Register = (firstName, lastName, email, password) => {
  return axios.post(`${BACKEND_URL}/signup`, {
    firstName,
    lastName,
    email,
    password,
  });
};

export { Login, Register };
