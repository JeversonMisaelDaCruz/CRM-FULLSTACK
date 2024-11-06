<template>
  <v-container>
    <v-fab
      class="me-4"
      icon="mdi-plus"
      location="bottom end"
      absolute
      app
      appear
      color="green"
      size="large"
      @click="dialog = true"
    />

    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="headline">Cadastrar Leads</span>
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
                  v-mask="'(##) #####-####'"
                  outlined
                  dense
                  hide-details
                />
              </v-col>

              <v-col>
                <v-select
                  v-model="leadData.lead_status_id"
                  :items="computedStatuses"
                  item-title="name"
                  item-value="id"
                  label="Status"
                  :rules="[rules.requiredStatus]"
                  required
                  :loading="loadingStatuses"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
            <v-card-actions style="display: flex; justify-content: end">
              <v-btn
                color="primary"
                style="
                  font-weight: bold;
                  color: white;
                  margin-right: 16px;
                  background-color: gainsboro;
                "
                @click="closeDialog"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="white"
                style="
                  font-weight: bold;
                  color: white;
                  margin-right: 16px;
                  background-color: green;
                "
                @click="createdStatusLeads"
              >
                Criar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="js">
import { ref, computed, onMounted } from "vue";
import { useLeadsStore } from "@/store/Leads";

const dialog = ref(false);
const leadData = ref({
  name: "",
  email: "",
  phone: "",
  lead_status_id: "",
});

const leadsStore = useLeadsStore();
const loadingStatuses = ref(true);

const computedStatuses = computed(() => {
  console.log("Conteúdo de statuses na computed:", leadsStore.statuses);
  return leadsStore.statuses || [];
});

const rules = {
  requiredStatus: (value) => !!value || "Status é obrigatório.",
};

const closeDialog = () => {
  dialog.value = false;
  resetForm();
};

const resetForm = () => {
  leadData.value = {
    name: "",
    email: "",
    phone: "",
    lead_status_id: "",
  };
};

const createdStatusLeads = async () => {
  try {
    // Aqui você pode adicionar lógica para criar o lead, se necessário
    closeDialog();
  } catch (error) {
    console.error(error);
  }
};

// Carrega os statuses quando o componente é montado
onMounted(async () => {
  await leadsStore.fetchStatuses();
  loadingStatuses.value = false;
  console.log("Statuses carregados após fetchStatuses:", leadsStore.statuses);
});
</script>
