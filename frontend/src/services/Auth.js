import Http from "./Http";
import axios from "axios";

export class Auth extends Http {
  constructor() {
    super("/users/auth");
  }

  async login(data) {
    return await this.post("/login", data);
  }

  async profile() {
    try {
      const response = await this.get("/profile");
      const UserId = localStorage.setItem("UserId", response.id);
      console.log("UserId:", UserId);
      console.log("Perfil carregado:", response);
      return response;
    } catch (error) {
      console.error("Erro no serviço de perfil:", error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.post("logout", {});
      localStorage.removeItem("@crm.access_token");
      delete axios.defaults.headers.Authorization;
    } catch (error) {
      console.error("Erro no serviço de logout:", error);
      throw error;
    }
  }
}
