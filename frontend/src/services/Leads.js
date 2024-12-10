import Http from "./Http";

export class Leads extends Http {
  constructor() {
    super("/leads");
  }

  async createLead(data) {
    try {
      const response = await this.post("", data);
      return response;
    } catch (error) {
      console.error("Erro ao criar lead", error);
      throw error;
    }
  }

  async getLeads() {
    try {
      const response = await this.get("");
      return response;
    } catch (error) {
      console.error("Erro ao obter leads", error);
      throw error;
    }
  }

  async updateLead(id, data) {
    try {
      const response = await this.patch(`/${id}`, data);
      console.log("Lead atualizado com sucesso:", response);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar lead:", error.response?.data?.message);
      throw new Error(
        error.response?.data?.message || "Erro ao atualizar o lead no servidor."
      );
    }
  }
  async deleteLead(id) {
    try {
      const response = await this.delete(`/${id}`);
      return response;
    } catch (error) {
      console.error("Erro ao deletar lead", error);
      throw error;
    }
  }
}
