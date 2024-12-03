<template>
  <v-dialog v-model="modelValue" max-width="900">
    <v-card>
      <v-card-title
        style="background-color: #b8ad90"
        class="d-flex justify-space-between align-center"
      >
        <span class="headline">{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <v-card class="elevation-4" style="padding: 16px">
          <v-row>
            <v-col>
              <v-text-field
                v-model="leadData.name"
                label="Nome"
                outlined
                dense
                hide-details
              />
            </v-col>

            <v-col>
              <v-text-field
                v-model="leadData.email"
                label="E-mail"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="leadData.phone"
                label="Telefone"
                outlined
                dense
                hide-details
              />
            </v-col>

            <v-col>
              <v-select
                v-model="leadData.pipeline_phase_id"
                :items="pipelinePhases"
                item-title="name"
                item-value="id"
                label="Pipeline Phase"
                :rules="[rules.requiredPipelinePhase]"
                required
                :loading="loadingPipelinePhases"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>

      <v-card-actions class="d-flex justify-end">
        <v-btn
          color="white"
          style="background-color: red; font-weight: bold; color: white"
          @click="closeModal"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="white"
          style="background-color: #b8ad90; font-weight: bold; color: white"
          @click="confirmAction"
        >
          {{ confirmButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Cadastrar Lead",
    },
    confirmButtonText: {
      type: String,
      default: "Criar",
    },
    pipelinePhases: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  emits: ["update:modelValue", "save-lead"],
  data() {
    return {
      leadData: {
        name: "",
        email: "",
        phone: "",
        pipeline_phase_id: "",
      },
      rules: {
        requiredPipelinePhase: (value) =>
          !!value || "Pipeline Phase é obrigatória.",
      },
      loadingPipelinePhases: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("update:modelValue", false);
      this.resetForm();
    },
    resetForm() {
      this.leadData = {
        name: "",
        email: "",
        phone: "",
        pipeline_phase_id: "",
      };
    },
    confirmAction() {
      this.$emit("save-lead", this.leadData);
      this.closeModal();
    },
  },
};
</script>
