import API from "@/services/module/API";
import { defineStore } from "pinia";
import { useAuthStore } from "@/store/auth/User";

export const usePipelineStore = defineStore("pipeline", {
  state: () => ({
    id: null,
    pipeline: [],
  }),
  actions: {
    setId(id) {
      this.id = id;
    },
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
        const authStore = useAuthStore();
        const userId = authStore.user.id;

        if (!userId) {
          console.error("Usuário não autenticado ou ID inválido.");
          return;
        }

        const payload = {
          name: data.name,
          userIds: [...new Set([...(data.userIds || []), userId])],
        };

        console.log("Payload enviado para o backend:", payload);

        const response = await API.pipeline.createPipeline(payload);

        if (!response || !response.id) {
          console.error("Resposta inválida do backend:", response);
          return;
        }

        console.log("Pipeline criada com sucesso:", response);

        if (data.phases && data.phases.length > 0) {
          console.log(`Criando fases para a pipeline ${response.id}...`);

          const phasePayloads = data.phases.map((phaseName) => ({
            name: phaseName,
            pipeline_id: response.id,
          }));

          for (const phase of phasePayloads) {
            try {
              const phaseResponse = await API.PipelinePhase.createPipelinePhase(
                phase
              );
              console.log("Fase criada com sucesso:", phaseResponse);
            } catch (phaseError) {
              console.error("Erro ao criar uma fase:", phaseError);
            }
          }
        }

        this.pipeline.push(response);
      } catch (error) {
        console.error("Erro ao criar pipeline ou fases:", error);
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
