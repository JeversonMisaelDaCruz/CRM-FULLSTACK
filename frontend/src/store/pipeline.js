import API from "@/services/module/API";
import { defineStore } from "pinia";

export const usePipelineStore = defineStore("pipeline", {
  state: () => ({
    pipeline: [],
  }),

  actions: {
    async fetchPipelines() {
      try {
        const response = await API.pipeline.getPipelines();
        console.log("fetchPipeline log:", response);
        this.pipeline = response;
      } catch (error) {
        console.error("Erro ao buscar pipelines:", error);
      }
    },

    async createPipeline(data) {
      try {
        const response = await API.pipeline.createPipeline(data);
        console.log("Pipeline criada com sucesso", response);
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
