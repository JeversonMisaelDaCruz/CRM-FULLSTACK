import Http from "./Http";

export class PipelinePhase extends Http {
  constructor() {
    super("/pipeline-phase");
  }

  async getPipelinePhase() {
    try {
      const response = await this.get("");
      console.log("Resposta completa no getPipelinePhase:", response);
      return response;
    } catch (error) {
      console.error("Erro ao obter getPipelinePhase:", error);
      throw error;
    }
  }
  async createPipeline(data) {
    try {
      const response = await this.post(data);
      console.log("pipeline criada com sucesso", response);
      return response;
    } catch (error) {
      console.error("não foi possivel criar sua pipeline");
      throw error;
    }
  }
  async updatePipeline(data) {
    try {
      const response = await this.patch(`/${data.id}`, data);
      console.log("pipeline atualizada com sucessso", response);
      return response;
    } catch (error) {
      console.error("nao foi possivel criar sua pipeline");
      throw error;
    }
  }
  async deletePipeline(id) {
    try {
      const response = await this.delete(`${id}`);
      console.log("pipeline deleta com sucesso", response);
      return response;
    } catch (error) {
      console.error("não foi possivel deletar sua pipeline");
      throw error;
    }
  }
}

export default PipelinePhase;
