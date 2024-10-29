import axios from "axios";

// Configurações do Axios
axios.defaults.timeout = 24 * 60 * 60 * 1000; // Tempo limite de 24 horas
axios.defaults.baseURL = "http://localhost:3001" || process.env.VUE_APP_API_URL;

class Http {
  constructor(path) {
    this.path = path;
  }

  async post(path, body, options = { headers: {} }) {
    try {
      const { data } = await axios.post(
        this.path + (path ? (path[0] === "/" ? path : `/${path}`) : ""),
        body,
        {
          headers: {
            ...this.HTTP_CONFIG,
            ...((options || {}).headers || {}),
          },
        }
      );
      return data;
    } catch (error) {
      this.checkExpires(error);
      throw error;
    }
  }

  async get(path, params = {}) {
    try {
      const { data } = await axios.get(
        this.path + (path ? (path[0] === "/" ? path : `/${path}`) : ""),
        {
          headers: this.HTTP_CONFIG,
          params,
        }
      );
      return data;
    } catch (error) {
      this.checkExpires(error);
      throw error;
    }
  }

  async patch(path, body, params = {}) {
    try {
      const { data } = await axios.patch(
        this.path + (path ? (path[0] === "/" ? path : `/${path}`) : ""),
        body,
        {
          headers: this.HTTP_CONFIG,
          params,
        }
      );
      return data;
    } catch (error) {
      this.checkExpires(error);
      throw error;
    }
  }

  async delete(path = "") {
    try {
      const { data } = await axios.delete(
        this.path + (path ? (path[0] === "/" ? path : `/${path}`) : ""),
        {
          headers: this.HTTP_CONFIG,
        }
      );
      return data;
    } catch (error) {
      this.checkExpires(error);
      throw error;
    }
  }
}

export default Http;
