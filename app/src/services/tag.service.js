import axios from "axios";

const API_URL = "http://localhost:8000/api/tags";

class TagService {
  async getAll() {
    try {
      const response = await axios.get(API_URL + "/");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async create(tag) {
    try {
      const response = await axios.post(API_URL + "/", tag);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async update(tag) {
    try {
      const response = await axios.put(API_URL + "/" + tag._id, tag);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new TagService();
