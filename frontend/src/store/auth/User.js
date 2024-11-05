import { defineStore } from "pinia";
import API from "@/services/module/API";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    sessionExpired: false,
    token: localStorage.getItem("@crm.access_token") || null,
  }),

  actions: {
    async login(email, password) {
      try {
        console.log("Chamando API de login com:", { email, password });
        const response = await API.auth.login({ email, password });
        console.log("Resposta da API:", response);
        this.setToken(response.access_token);http://localhost:3000/leads
        await this.fetchUserProfile();
        console.log("Usuário salvo:", this.user);
        return this.user;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },

    async fetchUserProfile() {
      try {
        const user = await API.auth.profile();
        this.setUser(user);
      } catch (error) {
        console.error("Erro ao buscar o perfil do usuário:", error);
      }
    },

    async logout() {
      try {
        await API.auth.logout();
        this.setUser(null);
        this.setToken(null);
        this.sessionExpired = true;

        console.log("Logout realizado com sucesso!");
      } catch (error) {
        console.error("Erro no logout:", error);
        throw error;
      }
    },

    setToken(token) {
      this.token = token;
      if (token) {
        localStorage.setItem("@crm.access_token", token);
      } else {
        localStorage.removeItem("@crm.access_token");
      }
    },

    setUser(user) {
      this.user = user;
    },
  },
});
