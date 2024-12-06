import Http from "./Http";

export class Pipeline extends Http {
  constructor() {
    super("/pipeline");
  }

  async createPipeline(data) {
    try {
      console.log("Enviando payload para o backend:", data);
      const response = await this.post("", data);
      console.log("Resposta do backend", response);
      return response;
    } catch (error) {
      console.log("Erro ao criar pipeline", error);
      throw error;
    }
  }

  async deletePipeline(id) {
    try {
      const response = await this.delete(`/${id}`);
      console.log("Pipeline deletada com sucesso", response);
      return response;
    } catch (error) {
      console.log("Não foi possível deletar a pipeline");
      throw error;
    }
  }

  async getPipeline() {
    try {
      const response = await this.get("");
      console.log("Pipelines carregadas", response);
      return response;
    } catch (error) {
      console.log("Erro ao carregar pipelines");
      throw error;
    }
  }

  async updatePipeline(data) {
    try {
      const response = await this.patch(`/${data.id}`, data);
      console.log("Pipeline atualizada", response);
      return response;
    } catch (error) {
      console.log("Erro ao atualizar pipeline");
      throw error;
    }
  }
}

export default Pipeline;
