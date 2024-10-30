import Http from "./Http";

export class Auth extends Http {
  constructor() {
    super("/users/auth");
  }
  async login(data) {
    try {
      console.log("dados recebidos", data);
      const response = await this.post("login", data);
      console.log("login service", response);
      return response;
    } catch (error) {
      console.error("erro login service", error);
      throw error;
    }
  }
}
