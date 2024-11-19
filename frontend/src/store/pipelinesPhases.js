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
        this.phases = response;
      } catch (error) {
        console.error("Erro ao buscar pipeline phases:", error);
      }
    },

    async createPipelinePhase(data) {
      try {
        const response = await API.PipelinePhase.createPipelinePhase(data);
        this.phases.push(response);
      } catch (error) {
        console.error("Erro ao criar pipeline phase:", error);
      }
    },
    async deletePipelinePhase(id) {
      try {
        const response = await API.PipelinePhase.deletePipelinePhase(id);
        console.log(
          "pipeline deletado com sucesso:passando na store ",
          response
        );
        return response;
      } catch (error) {
        console.error("erro ao deletar a pipeline phase no store");
        throw error;
      }
    },
    //parte logica de deletar pipeline phase feita falta somente a parte visual.
  },
});
