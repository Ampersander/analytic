import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/users/login", {
        email,
        password
      })
      .then(response => {
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(newUser) {
    return axios.post(API_URL + "/users/register", newUser).then(response => response.data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  useAuth() {
    const user = this.getCurrentUser();
    return !!user; // Return true if user exists, false otherwise
  }
}

const service = new AuthService()
export default service