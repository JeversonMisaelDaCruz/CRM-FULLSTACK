<template>
  <v-dialog
    :model-value="showPipelineModal"
    @update:model-value="updateShowPipelineModal"
    max-width="500"
  >
    <v-card>
      <v-card-title>Nova Pipeline</v-card-title>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-evenly;
        "
      >
        <div
          :style="getButtonStyle('pipeline')"
          @click="selectOption('pipeline')"
        >
          <v-icon icon="mdi-alert-circle" size="32" class="mb-2">
            mdi-alert
          </v-icon>
          <div>Pipeline</div>
        </div>
        <v-divider vertical class="mx-2" />
        <div :style="getButtonStyle('etapas')" @click="selectOption('etapas')">
          <v-icon icon="md:widgets" size="32" class="mb-2"> mdi-filter </v-icon>
          <div>Etapas</div>
        </div>
      </div>
      <v-card-text>
        <v-text-field
          v-model="localPipelineName"
          label="Nome:"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="white" @click="handleCancelPipelineModal">
          Cancelar
        </v-btn>
        <v-btn color="white" @click="handleCreatePipeline">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    showPipelineModal: {
      type: Boolean,
      required: true,
    },
    pipelineName: {
      type: String,
      required: false,
      default: "",
    },
  },
  emits: ["update:showPipelineModal", "createPipeline", "cancelPipelineModal"],
  data() {
    return {
      localPipelineName: this.pipelineName,
      selectedOption: "pipeline",
    };
  },
  methods: {
    updateShowPipelineModal(value) {
      this.$emit("update:showPipelineModal", value);
    },
    handleCancelPipelineModal() {
      this.$emit("cancelPipelineModal");
    },
    handleCreatePipeline() {
      if (!this.localPipelineName) {
        console.error("O nome da pipeline não pode estar vazio.");
        return;
      }
      console.log(
        "Emitindo evento createPipeline com:",
        this.localPipelineName
      );
      this.$emit("createPipeline", this.localPipelineName);
      this.updateShowPipelineModal(false);
    },
    selectOption(option) {
      this.selectedOption = option;
    },
    getButtonStyle(option) {
      return {
        textAlign: "center",
        cursor: "pointer",
        backgroundColor:
          this.selectedOption === option ? "#B8AD90" : "transparent",
        borderRadius: "8px",
        padding: "10px",
        transition: "background-color 0.3s",
      };
    },
  },
  watch: {
    pipelineName(newValue) {
      this.localPipelineName = newValue;
    },
  },
};
</script>

<style>
.text-center {
  text-align: center;
  font-size: 16px;
}
</style>
