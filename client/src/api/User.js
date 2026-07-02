import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
