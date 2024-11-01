// src/store/leads.js
import API from "@/services/module/API";

const state = {
  leads: [],
  statuses: [], // Armazena os diferentes statuses
};

const mutations = {
  SET_LEADS(state, leads) {
    state.leads = leads;
  },
  SET_STATUSES(state, statuses) {
    state.statuses = statuses;
  },
  ADD_LEAD(state, lead) {
    state.leads.push(lead);
  },
  UPDATE_LEAD(state, updatedLead) {
    const index = state.leads.findIndex((lead) => lead.id === updatedLead.id);
    if (index !== -1) {
      state.leads.splice(index, 1, updatedLead);
    }
  },
  REMOVE_LEAD(state, id) {
    state.leads = state.leads.filter((lead) => lead.id !== id);
  },
};

const actions = {
  async fetchLeads({ commit }) {
    try {
      const response = await API.leads.getLeads();
      commit("SET_LEADS", response);
    } catch (error) {
      console.error("Erro ao buscar leads:", error);
    }
  },
  async fetchStatuses({ commit }) {
    try {
      const response = await API.leads.getLeads();
      const uniqueStatuses = [
        ...new Set(response.map((lead) => lead.lead_status)),
      ].filter(Boolean);
      commit("SET_STATUSES", uniqueStatuses);
    } catch (error) {
      console.error("Erro ao buscar statuses:", error);
    }
  },
  async createLead({ commit }, leadData) {
    try {
      const response = await API.leads.createLead(leadData);
      commit("ADD_LEAD", response);
      return response;
    } catch (error) {
      console.error("Erro ao criar lead:", error);
      throw error;
    }
  },
  async updateLead({ commit }, leadData) {
    try {
      const response = await API.leads.updateLead(leadData);
      commit("UPDATE_LEAD", response);
      return response;
    } catch (error) {
      console.error("Erro ao atualizar lead:", error);
      throw error;
    }
  },
  async deleteLead({ commit }, id) {
    try {
      await API.leads.deleteLead(id);
      commit("REMOVE_LEAD", id);
    } catch (error) {
      console.error("Erro ao deletar lead:", error);
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
