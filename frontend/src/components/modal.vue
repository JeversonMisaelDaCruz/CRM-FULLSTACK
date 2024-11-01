<!-- src/components/modal.vue -->
<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="headline">
        {{ editMode ? "Editar Lead" : "Cadastro de Lead" }}
      </v-card-title>
      <v-card-text>
        <v-form ref="leadForm" v-model="isValid">
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field v-model="leadData.name" label="Nome*" :rules="[rules.required]" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="leadData.email" label="Email*" :rules="[rules.required, rules.email]"
                required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="leadData.phone" label="Telefone"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="leadData.lead_status_id" :items="statuses" item-text="name" item-value="id"
                label="Status" :rules="[rules.requiredStatus]" required></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeModal">Cancelar</v-btn>
        <v-btn color="primary" text @click="submitForm">{{ editMode ? "Atualizar" : "Salvar" }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Modal",
  props: {
    modelValue: Boolean,
    leadToEdit: {
      type: Object,
      default: null,
    },
    statuses: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue", "lead-saved", "lead-updated"],
  computed: {
    dialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    editMode() {
      return !!this.leadToEdit;
    },
  },
  data() {
    return {
      isValid: false,
      leadData: {
        name: "",
        email: "",
        phone: "",
        lead_status_id: "", // Campo para capturar o status
      },
      rules: {
        required: (value) => !!value || "Este campo é obrigatório.",
        email: (value) => {
          const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
          return pattern.test(value) || "E-mail inválido.";
        },
        requiredStatus: (value) => !!value || "Status é obrigatório.",
      },
    };
  },
  watch: {
    leadToEdit: {
      immediate: true,
      handler(newLead) {
        if (newLead) {
          this.leadData = { ...newLead };
        } else {
          this.resetForm();
        }
      },
    },
  },
  methods: {
    closeModal() {
      this.dialog = false;
      this.resetForm();
    },
    submitForm() {
      if (this.$refs.leadForm && this.$refs.leadForm.validate()) {
        const leadData = { ...this.leadData, lead_status_id: this.leadData.lead_status_id || null };
        if (this.editMode) {
          this.$emit("lead-updated", leadData);
        } else {
          this.$emit("lead-saved", leadData);
        }
        this.closeModal();
      }
    },
    resetForm() {
      this.leadData = {
        name: "",
        email: "",
        phone: "",
        lead_status_id: "",
      };
      if (this.$refs.leadForm) {
        this.$refs.leadForm.resetValidation();
      }
    },
  },
};
</script>
