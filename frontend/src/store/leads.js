// src/store/leads.js
import API from "@/services/module/API";

const state = {
  leads: [],
};

const mutations = {
  SET_LEADS(state, leads) {
    state.leads = leads;
  },
  ADD_LEAD(state, lead) {
    state.leads.push(lead);
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
