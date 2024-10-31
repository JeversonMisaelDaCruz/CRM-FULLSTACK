// src/services/Http.js
import axios from "axios";

// Configurações do Axios
axios.defaults.timeout = 24 * 60 * 60 * 1000; // Tempo limite de 24 horas
axios.defaults.baseURL = process.env.VUE_APP_API_URL || "http://localhost:3001"; // Ajuste a URL conforme necessário

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
        this.path + (path ? (path[0] === "/" ? path : `/${path}`) : ""),
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


  async get(path = "", params = {}, options = {}) {
    try {
      const { data } = await axios.get(
        this.path + (path ? (path[0] === "/" ? path : `/${path}`) : ""),
        {
          params,
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

 

  async patch(path = "", body = {}, options = {}) {
    try {
      const { data } = await axios.patch(
        this.path + (path ? (path[0] === "/" ? path : `/${path}`) : ""),
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

  async delete(path = "", options = {}) {
    try {
      const { data } = await axios.delete(
        this.path + (path ? (path[0] === "/" ? path : `/${path}`) : ""),
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

  checkExpires(error) {
    if (error.response && error.response.status === 401) {
      console.warn("Sua sessão expirou. Por favor, realize o login novamente.");
      localStorage.removeItem("token");
    }
  }
}

export default Http;
