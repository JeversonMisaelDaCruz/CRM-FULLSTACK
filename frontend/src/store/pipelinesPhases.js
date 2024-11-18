import API from "@/services/module/API";
import { defineStore } from "pinia";

export const usePipelinePhaseStore = defineStore("pipelinePhase", {
  state: () => ({
    phases: [],
  }),

  actions: {
    async fetchPipelinePhases() {
      try {
        const response = await API.PipelinePhase.getPipelinePhase();
        this.PipelinePhase = response;
        console.log("pipelinephase log:", response);
      } catch (error) {
        console.error("Erro ao buscar pipelinephase:", error);
      }
    },

    async createPipelinePhase(data) {
      try {
        const response = await API.PipelinePhase.createPipelinePhase(data);
        console.log("Pipeline Phase criada com sucesso", response);
        this.phases.push(response);
      } catch (error) {
        console.error("Erro ao criar pipeline phase:", error);
      }
    },

    async updatePipelinePhase(data) {
      try {
        const response = await API.PipelinePhase.updatePipelinePhase(data);
        console.log("Pipeline Phase atualizada com sucesso", response);
        const index = this.phases.findIndex(
          (phase) => phase.id === response.id
        );
        if (index !== -1) {
          this.phases.splice(index, 1, response);
        }
      } catch (error) {
        console.error("Erro ao atualizar pipeline phase:", error);
      }
    },

    async deletePipelinePhase(id) {
      try {
        await API.PipelinePhase.deletePipelinePhase(id);
        console.log("Pipeline Phase deletada com sucesso");
        this.phases = this.phases.filter((phase) => phase.id !== id);
      } catch (error) {
        console.error("Erro ao deletar pipeline phase:", error);
      }
    },
  },
});
