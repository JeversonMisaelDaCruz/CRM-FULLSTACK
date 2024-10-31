// src/services/module/Leads.js
import Http from "../Http";

export class Leads extends Http {
  constructor() {
    super("/leads"); // Rota base para leads no backend
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
      const response = await this.get();
      return response;
    } catch (error) {
      console.error("Erro ao obter leads", error);
      throw error;
    }
  }
}

export default Leads;
