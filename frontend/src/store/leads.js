import { defineStore } from "pinia";
import API from "@/services/module/API";

export const useLeadsStore = defineStore("leads", {
  state: () => ({
    leads: [],
    PipelinePhase: [],
  }),

  actions: {
    async fetchLeads() {
      try {
        const response = await API.leads.getLeads();
        this.leads = response;
      } catch (error) {
        console.error("Erro ao buscar leads:", error);
      }
    },

    async fetchPipelinePhases() {
      try {
        const response = await API.PipelinePhase.getPipelinePhase();
        this.PipelinePhase = response;
        console.log("Statuses:", this.PipelinePhase);
      } catch (error) {
        console.error("Erro ao buscar statuses:", error);
      }
    },

    async createLead(leadData) {
      try {
        const response = await API.leads.createLead(leadData);
        this.leads.push(response);
        return response;
      } catch (error) {
        console.error("Erro ao criar lead:", error);
        throw error;
      }
    },

    async updateLead(leadData) {
      try {
        const response = await API.leads.updateLead(leadData);
        const index = this.leads.findIndex((lead) => lead.id === response.id);
        if (index !== -1) {
          this.leads.splice(index, 1, response);
        }
        return response;
      } catch (error) {
        console.error("Erro ao atualizar lead:", error);
        throw error;
      }
    },

    async deleteLead(id) {
      try {
        await API.leads.deleteLead(id);
        this.leads = this.leads.filter((lead) => lead.id !== id);
      } catch (error) {
        console.error("Erro ao deletar lead:", error);
        throw error;
      }
    },
  },
});
