import API from "@/services/module/API";
import { defineStore } from "pinia";
import { useAuthStore } from "@/store/auth/User";

export const usePipelineStore = defineStore("pipeline", {
  state: () => ({
    pipeline: [],
  }),

  actions: {
    async fetchPipelines() {
      try {
        const response = await API.pipeline.getPipeline();
        console.log("fetchPipeline log:", response);
        this.pipeline = response;
      } catch (error) {
        console.error("Erro ao buscar pipelines:", error);
      }
    },

    async createPipeline(data) {
      try {
        // Obter o token e o userId da store de autenticação
        const authStore = useAuthStore(); // Certifique-se de ter importado
        const userId = authStore.user.id;

        if (!userId) {
          console.error("Usuário não autenticado ou ID inválido.");
          return;
        }

        // Garantir que o payload tenha IDs únicos
        const payload = {
          name: data.name, // O nome da pipeline
          userIds: [...new Set([...(data.userIds || []), userId])], // IDs únicos
        };

        console.log("Payload enviado para o backend:", payload);

        // Enviar a requisição ao backend
        const response = await API.pipeline.createPipeline(payload);

        if (!response || !response.id) {
          console.error("Resposta inválida do backend:", response);
          return;
        }

        console.log("Pipeline criada com sucesso:", response);

        // Atualizar o estado da store com a nova pipeline
        this.pipeline.push(response);
      } catch (error) {
        console.error("Erro ao criar pipeline:", error);
      }
    },

    async updatePipeline(data) {
      try {
        const response = await API.pipeline.updatePipeline(data);
        console.log("Pipeline atualizada com sucesso", response);
        const index = this.pipeline.findIndex(
          (pipeline) => pipeline.id === response.id
        );
        if (index !== -1) {
          this.pipeline.splice(index, 1, response);
        }
      } catch (error) {
        console.error("Erro ao atualizar pipeline:", error);
      }
    },

    async deletePipeline(id) {
      try {
        await API.pipeline.deletePipeline(id);
        console.log("Pipeline deletada com sucesso");
        this.pipeline = this.pipeline.filter((pipeline) => pipeline.id !== id);
      } catch (error) {
        console.error("Erro ao deletar pipeline:", error);
      }
    },
  },
});
