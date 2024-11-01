// src/services/module/Leads.js
import Http from "../Http";

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
      const response = await this.get();
      return response;
    } catch (error) {
      console.error("Erro ao obter leads", error);
      throw error;
    }
  }

  async updateLead(data) {
    try {
      const response = await this.patch(`/${data.id}`, data);
      console.log("lead atualizado", response);
      return response;
    } catch (error) {
      console.error("Erro ao atualizar lead", error);
      throw error;
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

export default Leads;
