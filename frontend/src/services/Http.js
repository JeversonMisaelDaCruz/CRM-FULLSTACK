import axios from "axios";
import { useAuthStore } from "../store/auth/User";

axios.defaults.timeout = 24 * 60 * 60 * 1000;
axios.defaults.baseURL = process.env.VUE_APP_API_URL || "http://localhost:3001";

class Http {
  constructor(path) {
    this.path = path;
  }

  get HTTP_CONFIG() {
    const token = localStorage.getItem("@crm.access_token");
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    console.log(token);
  }

  handleSessionExpired() {
    const userStore = useAuthStore();
    userStore.setSessionExpired(true);
  }

  checkExpires(error) {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data &&
      error.response.data.message === "Unauthorized"
    ) {
      this.handleSessionExpired();
    }
  }

  buildPath(subPath = "") {
    return this.path + (subPath.startsWith("/") ? subPath : `/${subPath}`);
  }

  handleError(error) {
    if (axios.isAxiosError(error)) {
      this.checkExpires(error);
    }
    console.error("Erro na requisição HTTP:", error);
    throw error;
  }

  async post(path, body, options = {}) {
    try {
      const response = await axios.post(this.buildPath(path), body, {
        headers: {
          ...this.HTTP_CONFIG.headers,
          ...options.headers,
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async get(path, params = {}) {
    try {
      const response = await axios.get(this.buildPath(path), {
        headers: this.HTTP_CONFIG.headers,
        params,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async patch(path, body, params = {}) {
    try {
      const response = await axios.patch(this.buildPath(path), body, {
        headers: this.HTTP_CONFIG.headers,
        params,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async delete(path = "") {
    try {
      const response = await axios.delete(this.buildPath(path), {
        headers: this.HTTP_CONFIG.headers,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
}

export default Http;
