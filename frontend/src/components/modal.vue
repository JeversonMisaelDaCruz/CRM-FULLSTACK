<!-- src/components/modal.vue -->
<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="headline">Cadastro de Lead</v-card-title>
      <v-card-text>
        <v-form ref="leadForm" v-model="isValid">
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field v-model="leadData.firstName" label="Primeiro Nome*" :rules="[rules.required]"
                required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field v-model="leadData.lastName" label="Sobrenome*" :rules="[rules.required]"
                required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field v-model="leadData.email" label="Email*" :rules="[rules.required, rules.email]"
                required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field v-model="leadData.phone" label="Telefone"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeModal">Cancelar</v-btn>
        <v-btn color="primary" text @click="submitForm">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Modal",
  props: {
    modelValue: Boolean,
  },
  emits: ["update:modelValue", "lead-saved"],
  data() {
    return {
      dialog: this.modelValue,
      isValid: false,
      leadData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      rules: {
        required: (value) => !!value || "Este campo é obrigatório.",
        email: (value) => {
          const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
          return pattern.test(value) || "E-mail inválido.";
        },
      },
    };
  },
  watch: {
    modelValue(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("update:modelValue", val);
    },
  },
  methods: {
    closeModal() {
      this.dialog = false;
      this.resetForm();
    },
    submitForm() {
      if (this.$refs.leadForm.validate()) {
        this.$emit("lead-saved", { ...this.leadData });
        this.closeModal();
      }
    },
    resetForm() {
      this.leadData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      };
      this.$refs.leadForm.resetValidation();
    },
  },
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
