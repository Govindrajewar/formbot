import axios from "axios";
import { BACKEND_URL } from "../deploymentLink";

const Login = async (email, password) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

const Register = async (userName, email, password) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/signup`, {
      userName,
      email,
      password,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export { Login, Register };
