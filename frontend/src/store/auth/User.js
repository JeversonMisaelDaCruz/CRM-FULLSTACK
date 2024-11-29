import { defineStore } from "pinia";
import API from "@/services/module/API";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("@crm.access_token") || null,
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await API.auth.login({ email, password });
        this.setToken(response.access_token);
        await this.fetchUserProfile();
        return this.user;
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
      }
    },

    async fetchUserProfile() {
      try {
        const user = await API.auth.profile();
        this.user = user;
      } catch (error) {
        console.error("Erro ao buscar o perfil do usuário:", error);
      }
    },

    logout() {
      
      this.setToken(null);
      this.user = null;
      console.log("Logout realizado com sucesso!");
    },

    setToken(token) {
      this.token = token;
      if (token) {
        localStorage.setItem("@crm.access_token", token);
      } else {
        localStorage.removeItem("@crm.access_token");
      }
    },
  },
});
