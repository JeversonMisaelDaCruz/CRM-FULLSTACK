import Http from "./Http";

export class PipelinePhase extends Http {
  constructor() {
    super("/pipeline-phase");
  }

  async getPipelinePhase() {
    try {
      return await this.get("");
    } catch (error) {
      throw error;
    }
  }

  async createPipelinePhase(data) {
    try {
      return await this.post("", data);
    } catch (error) {
      throw error;
    }
  }

  async deletePipelinePhase(id) {
    try {
      const response = await this.delete(`/${id}`);
      console.log("Delete pipeline no service", response);
      return response;
    } catch (error) {
      console.error("Erro ao deletar pipelinePhase no service");
      throw error;
    }
  }
}
