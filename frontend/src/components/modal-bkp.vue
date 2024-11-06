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
              <v-select v-model="leadData.lead_status_id" :items="computedStatuses" item-text="name" item-value="id"
                label="Status" :rules="[rules.requiredStatus]" required :loading="loadingStatuses"
                :disabled="loadingStatuses || !computedStatuses.length" />
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
import { useLeadStatusesStore } from "@/store/StatusLeads";
import { ref, computed, watch, onMounted } from "vue";

export default {
  name: "Modal",
  props: {
    modelValue: Boolean,
    leadToEdit: {
      type: Object,
      default: null,
    },
  },

  emits: ["update:modelValue", "lead-saved", "lead-updated"],

  setup(props, { emit }) {
    const leadStatusesStore = useLeadStatusesStore();
    const dialog = ref(props.modelValue);
    const isValid = ref(false);
    const loadingStatuses = ref(true);
    const errorLoadingStatuses = ref(false);


    const computedStatuses = computed(() => leadStatusesStore.statuses || []);

    const leadData = ref({
      name: "",
      email: "",
      phone: "",
      lead_status_id: "",
    });

    const rules = {
      required: (value) => !!value || "Este campo é obrigatório.",
      email: (value) => {
        const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return pattern.test(value) || "E-mail inválido.";
      },
      requiredStatus: (value) => !!value || "Status é obrigatório.",
    };


    watch(
      () => props.modelValue,
      (newVal) => {
        dialog.value = newVal;
      }
    );

    watch(
      dialog,
      (newVal) => {
        emit("update:modelValue", newVal);
      }
    );


    watch(
      computedStatuses,
      (newStatuses) => {
        console.log("Conteúdo de computedStatuses:", newStatuses);
        if (Array.isArray(newStatuses) && newStatuses.length > 0) {
          loadingStatuses.value = false;
        } else if (!Array.isArray(newStatuses) || newStatuses.length === 0) {
          loadingStatuses.value = false;
          errorLoadingStatuses.value = true;
        }
      },
      { immediate: true }
    );

    const closeModal = () => {
      dialog.value = false;
      resetForm();
    };

    const submitForm = () => {
      if (isValid.value) {
        const leadDataCopy = { ...leadData.value };
        if (props.leadToEdit) {
          emit("lead-updated", leadDataCopy);
        } else {
          emit("lead-saved", leadDataCopy);
        }
        closeModal();
      }
    };

    const resetForm = () => {
      leadData.value = {
        name: "",
        email: "",
        phone: "",
        lead_status_id: "",
      };
    };

    onMounted(async () => {
      loadingStatuses.value = true;
      errorLoadingStatuses.value = false;

      try {
        await leadStatusesStore.fetchStatuses();
        console.log("Statuses carregados com sucesso:", leadStatusesStore.statuses.value);
      } catch (error) {
        console.error("Erro ao carregar statuses:", error);
        errorLoadingStatuses.value = true;
      } finally {
        loadingStatuses.value = false;
      }
    });

    return {
      dialog,
      leadData,
      isValid,
      rules,
      computedStatuses,
      loadingStatuses,
      errorLoadingStatuses,
      closeModal,
      submitForm,
    };
  },
};
</script>
