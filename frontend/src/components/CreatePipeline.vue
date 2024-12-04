<template>
  <v-dialog
    :model-value="showPipelineModal"
    @update:model-value="updateShowPipelineModal"
    max-width="500"
  >
    <v-card>
      <v-card-title>Nova Pipeline</v-card-title>

      <div class="option-container">
        <div
          :class="['option-button', { active: selectedOption === 'pipeline' }]"
          @click="selectOption('pipeline')"
        >
          <v-icon icon="mdi-alert-circle" size="32" class="mb-2">
            mdi-alert
          </v-icon>
          <div>Pipeline</div>
        </div>

        <v-divider vertical class="mx-2" />

        <div
          :class="['option-button', { active: selectedOption === 'etapas' }]"
          @click="selectOption('etapas')"
        >
          <v-icon icon="mdi-widgets" size="32" class="mb-2">mdi-filter</v-icon>
          <div>Etapas</div>
        </div>
      </div>

      <v-card-text>
        <template v-if="selectedOption === 'pipeline'">
          <v-text-field
            v-model="localPipelineName"
            label="Nome:"
            required
          ></v-text-field>
        </template>

        <template v-else-if="selectedOption === 'etapas'">
          <div>
            <h3>Etapas Predefinidas</h3>
            <v-list>
              <v-list-item v-for="(step, index) in steps" :key="index">
                <v-list-item-title>{{ step }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-text-field
              v-model="newStep"
              label="Nova Etapa"
              placeholder="Adicionar nova etapa"
              class="mt-4"
            ></v-text-field>
            <v-btn color="#B8AD90" class="mt-2" @click="addStep">
              Adicionar Etapa
            </v-btn>
          </div>
        </template>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="white" @click="cancelPipelineModal">Cancelar</v-btn>
        <v-btn color="white" @click="savePipeline">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { usePipelineStore } from "@/store/pipeline";
import { usePipelinePhaseStore } from "@/store/pipelinesPhases";
import { useAuthStore } from "@/store/auth/User";

export default {
  props: {
    showPipelineModal: {
      type: Boolean,
      required: true,
    },
    pipelineName: {
      type: String,
      default: "",
    },
  },
  emits: ["update:showPipelineModal", "createPipeline", "cancelPipelineModal"],
  data() {
    return {
      localPipelineName: this.pipelineName,
      selectedOption: "pipeline",
      steps: ["Test"],
      newStep: "",
    };
  },
  methods: {
    updateShowPipelineModal(value) {
      this.$emit("update:showPipelineModal", value);
    },
    cancelPipelineModal() {
      this.$emit("cancelPipelineModal");
    },
    async savePipeline() {
      if (!this.localPipelineName) {
        console.error("O nome da pipeline não pode estar vazio.");
        return;
      }

      try {
        console.log("Iniciando a criação da pipeline...");

        const authstore = useAuthStore();
        const userId = authstore.user.id;
        
        if (!userId || userId.length !== 36) {
          console.error("ID do usuário inválido:", userId);
          return;
        }

        console.log("ID do usuário recuperado :", userId);

        const pipelineStore = usePipelineStore();
        const pipelinePhaseStore = usePipelinePhaseStore();
        const pipelinePayload = {
          name: this.localPipelineName,
          userIds: [userId], // Certifique-se de que `userId` é um UUID válido
        };

        // 1. Criar a Pipeline usando a store
        const pipeline = await pipelineStore.createPipeline(pipelinePayload);
        console.log("Pipeline criada com sucesso:", pipelinePayload);

        // 2. Criar as Fases associadas à pipeline
        if (this.steps.length > 0) {
          for (const step of this.steps) {
            console.log(`Criando fase para a pipeline ${pipeline.id}:`, step);
            const phase = await pipelinePhaseStore.createPipelinePhase({
              name: step,
              pipeline_id: pipeline.id,
            });
            console.log("Resposta da criação da fase:", phase);
          }
          console.log("Fases criadas com sucesso!");
        }

        // Fechar o modal e emitir evento
        this.$emit("createPipeline", {
          id: pipeline.id,
          name: this.localPipelineName,
          steps: this.steps,
        });
        this.updateShowPipelineModal(false);
      } catch (error) {
        console.error("Erro ao salvar pipeline ou fases:", error.message);
      }
    },
    selectOption(option) {
      this.selectedOption = option;
    },
    addStep() {
      const stepName = this.newStep.trim();
      if (!stepName) {
        console.error("O nome da etapa não pode estar vazio.");
        return;
      }
      this.steps.push(stepName);
      this.newStep = "";
    },
  },
  watch: {
    pipelineName(newValue) {
      this.localPipelineName = newValue;
    },
  },
};
</script>

<style scoped>
.option-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.option-button {
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  padding: 10px;
  transition: background-color 0.3s;
}

.option-button.active {
  background-color: #b8ad90;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}
</style>
