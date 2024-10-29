import Http from "./Http";

export class Auth extends Http {
  constructor() {
    super("user/auth");
  }
  async login(data) {
    try {
      const response = await this.post("login", data);
      console.log("login service", response);
      return response;
    } catch (error) {
      console.error("erro login service", error);
      throw error;
    }
  }
}
