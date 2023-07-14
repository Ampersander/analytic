import axios from "axios";

const API_URL = "http://localhost:8000/users";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/login", {
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

  register(email, password) {
    return axios.post(API_URL + "/", {
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  useAuth() {
    const user = this.getCurrentUser();
    return !!user; // Return true if user exists, false otherwise
  }
}

export default new AuthService();
