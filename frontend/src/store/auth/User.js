// src/store/users.js
import API from "@/services/module/API";

const state = {
  users: [],
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  REMOVE_USER(state, id) {
    state.users = state.users.filter((user) => user.id !== id);
  },
};

const actions = {
  async fetchUsers({ commit }) {
    try {
      const response = await API.users.getUsers(); // Assumindo que existe um método getUsers()
      commit("SET_USERS", response);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  },
  async deleteUser({ commit }, id) {
    try {
      await API.users.deleteUser(id);
      commit("REMOVE_USER", id);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
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
