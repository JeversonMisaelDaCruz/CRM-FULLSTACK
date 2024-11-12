import Http from "./Http";

export class Pipeline extends Http {
  constructor() {
    super("/pipeline");
  }

  async createPipeline(data) {
    try {
      const response = await this.post("", data);
      console.log("Pipeline criado", response);
      return response;
    } catch (error) {
      console.log("Erro ao criar pipeline", error);
    }
  }
  async deletePipeline(id) {
    try {
      const response = await this.delete(`/${id}`);
      console.log("pipeline deletada com sucesso", response);
      return response;
    } catch (error) {
      console.log("Não foi possivel deletar sua pipeline");
    }
  }
  async getPipeline() {
    try {
      const response = await this.get("");
      console.log("Pipelines puxadas", response);
      return response;
    } catch (error) {
      console.log("erro em puxar as Pipelines ", response);
    }
  }
  async updatePipeline(data) {
    try {
      const response = await this.patch(`/${data.id}`, data);
      console.log("pipeline atualizada", response);
      return response;
    } catch (error) {
      console.log("erro ao editar pipeline", response);
    }
  }
}
export default Pipeline;
