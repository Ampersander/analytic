import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class UsersService {
  getAllUsers() {
    return axios.get(API_URL + "/users").then((response) => response.data);
  }
}

const service = new UsersService();
export default service;
