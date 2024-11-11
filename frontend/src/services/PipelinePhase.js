import Http from "./Http";

export class PipelinePhase extends Http {
  constructor() {
    super("/pipeline-phase");
  }

  async getPipelinePhase() {
    try {
      const response = await this.get("");
      console.log("Resposta completa no getPipelinePhase:", response);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter getPipelinePhase:", error);
      throw error;
    }
  }
}

export default PipelinePhase;
