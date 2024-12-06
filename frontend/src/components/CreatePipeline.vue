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
            <h3>ETAPAS:</h3>
            <v-list>
              <v-list-item v-for="(step, index) in steps" :key="index">
                <v-row align="center" class="w-100">
                  <v-col>
                    <v-list-item-title>{{ step }}</v-list-item-title>
                  </v-col>
                  <v-col class="d-flex justify-end" cols="auto">
                    <v-icon color="red" @click="deleteStep(index)">
                      mdi-delete
                    </v-icon>
                  </v-col>
                </v-row>
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
      steps: ["Prospeção"],
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

        const authStore = useAuthStore();
        const userId = authStore.user.id;

        if (!userId) {
          console.error("Usuário não autenticado.");
          return;
        }

        const pipelineStore = usePipelineStore();
        const pipelinePayload = {
          name: this.localPipelineName,
          userIds: [userId],
          phases: this.steps,
        };

        const pipeline = await pipelineStore.createPipeline(pipelinePayload);

        console.log("Pipeline e fases criadas com sucesso:", pipeline);

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
    deleteStep(index) {
      this.steps.splice(index, 1);
      console.log(`'step deletado com sucesso no index ${index}`);
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
