<template>
  <v-dialog
    :model-value="showPipelineModal"
    @update:model-value="updateShowPipelineModal"
    max-width="500"
  >
    <v-card>
      <v-card-title>Cadastrar Pipeline</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="localPipelineName"
          label="Nome:"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="#B8AD90" @click="handleCreatePipeline">Salvar</v-btn>
        <v-btn color="grey" @click="handleCancelPipelineModal">
          Cancelar
        </v-btn>
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
      localPipelineName: this.pipelineName, // Local copy for editing
    };
  },
  methods: {
    updateShowPipelineModal(value) {
      this.$emit("update:showPipelineModal", value); // Notify parent of changes
    },
    handleCancelPipelineModal() {
      this.$emit("cancelPipelineModal"); // Emit cancel event
    },
    handleCreatePipeline() {
      if (!this.localPipelineName) {
        console.error("O nome da pipeline não pode estar vazio.");
        return;
      }
      // Emit the updated pipeline name to the parent
      console.log(
        "Emitindo evento createPipeline com:",
        this.localPipelineName
      );
      this.$emit("createPipeline", this.localPipelineName);
      this.updateShowPipelineModal(false); // Close the modal after save
    },
  },
  watch: {
    pipelineName(newValue) {
      this.localPipelineName = newValue; // Sync local copy with prop changes
    },
  },
};
</script>
