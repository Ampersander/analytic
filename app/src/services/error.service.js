import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8000"


class ErrorService {
  getErrorsByVisitorId(visitorIDRequest) {
    return axios.get(`${API_URL}/errors/visitor` + visitorIDRequest, { headers: authHeader() });
  }

  getErrors() {
    console.log("API_URL: "+API_URL);
    return axios.get(`${API_URL}/errors`, { headers: authHeader() });
  }

  createError(errorRequest) {
    return axios.post(`${API_URL}/errors`, errorRequest);
  }

  deleteError(id) {
    return axios.delete(`${API_URL}/errors/${id}`, { headers: authHeader() });
  }

  updateError(id, errorRequest) {
    return axios.put(`${API_URL}/errors/${id}`, errorRequest, { headers: authHeader() });
  }
}

const service = new ErrorService()
export default service