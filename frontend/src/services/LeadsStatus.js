import Http from "./Http";

export class LeadsStatus extends Http {
  constructor() {
    super("/lead-status");
  }

  async getLeadsStatus() {
    try {
      const response = await this.get("");
      console.log("Resposta completa no getLeadsStatus:", response);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter leads status:", error);
      throw error;
    }
  }
}

export default LeadsStatus;
