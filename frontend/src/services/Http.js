// src/services/Http.js
import axios from "axios";

axios.defaults.timeout = 24 * 60 * 60 * 1000; // Tempo limite de 24 horas
axios.defaults.baseURL =
  process.env.VUE_APP_API_URL || "http://localhost:3001"; // Certifique-se de que a URL está correta

class Http {
  constructor(path) {
    this.path = path;
  }

  get HTTP_CONFIG() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    };
  }

  async post(path = "", body = {}, options = {}) {
    try {
      const { data } = await axios.post(
        `${this.path}${path}`,
        body,
        {
          ...this.HTTP_CONFIG,
          ...options,
        }
      );
      return data;
    } catch (error) {
      this.checkExpires(error);
      throw error;
    }
  }

  // Métodos get, patch e delete similares...
}

export default Http;
