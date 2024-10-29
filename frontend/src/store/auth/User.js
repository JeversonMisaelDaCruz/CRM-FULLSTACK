import API from "@/services/module/API";

const state = {
  user: null,
};

const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
};

// const getters = {
//   getbyid: (state) => (id) => {
//     return state.user.find((user) => user.id === id);
//   },
// };

const actions = {
  async login({ commit }, requestBody) {
    try {
      console.log("dados recebidos", requestBody);
      const response = await API.auth.login(requestBody);
      console.log("login store", response);
      commit("SET_USER", response);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  // getters,
  actions,
};
