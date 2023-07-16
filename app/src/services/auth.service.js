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

  async getProfile() {
    const token = this.getCurrentUser().token;
    const response = await axios.get(API_URL + "/users/me", { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  }

  async updateProfile(updatedUser) {
    const token = this.getCurrentUser().token;
    const response = await axios.put(API_URL + "/users/me", updatedUser, { headers: { Authorization: `Bearer ${token}` } });
    return response;
  }
}

const service = new AuthService()
export default service