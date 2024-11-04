<template>
  <v-app>
    <v-container>
      <h1 class="text-h4 mb-4">Gerenciar Leads</h1>
      <v-btn color="primary" @click="openModal()">Novo Lead</v-btn>
      <modal v-model="dialog" :leadToEdit="selectedLead" :statuses="statuses" @lead-saved="handleCreateLead"
        @lead-updated="handleUpdateLead" />
      <v-data-table :headers="headers" :items="leads" class="elevation-1 mt-4">
        <template #item.actions="{ item }">
          <v-btn icon @click="openModal(item)">
            <v-icon color="white">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="handleDeleteLead(item.id)">
            <v-icon color="white">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-snackbar v-model="snackbar" :timeout="3000" top right>
        {{ snackbarMessage }}
        <v-btn color="red" text @click="snackbar = false">Fechar</v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useLeadsStore } from "../store/Leads"; // Store do Pinia para "leads"
import modal from "@/components/modal.vue";

// Referências e estados locais
const dialog = ref(false);
const selectedLead = ref(null);
const snackbar = ref(false);
const snackbarMessage = ref("");

// Configuração dos headers da tabela
const headers = [
  { text: "Nome", value: "name" },
  { text: "Email", value: "email" },
  { text: "Telefone", value: "phone" },
  { text: "Status", value: "status" },
  { text: "Ações", value: "actions", sortable: false },
];

// Acessando a store do Pinia
const leadsStore = useLeadsStore();
const leads = leadsStore.leads;
const statuses = leadsStore.statuses;

// Métodos
const openModal = (lead = null) => {
  selectedLead.value = lead;
  dialog.value = true;
};

const handleCreateLead = async (leadData) => {
  try {
    await leadsStore.createLead(leadData);
    snackbarMessage.value = "Lead criado com sucesso!";
    snackbar.value = true;
  } catch (error) {
    console.error("Erro ao criar lead:", error);
  }
};

const handleUpdateLead = async (leadData) => {
  try {
    await leadsStore.updateLead(leadData);
    snackbarMessage.value = "Lead atualizado com sucesso!";
    snackbar.value = true;
  } catch (error) {
    console.error("Erro ao atualizar lead:", error);
  }
};

const handleDeleteLead = async (id) => {
  try {
    await leadsStore.deleteLead(id);
    snackbarMessage.value = "Lead deletado com sucesso!";
    snackbar.value = true;
  } catch (error) {
    console.error("Erro ao deletar lead:", error);
    snackbarMessage.value = "Erro ao deletar lead";
    snackbar.value = true;
  }
};

// Carregar leads e statuses ao montar o componente
onMounted(async () => {
  await leadsStore.fetchLeads();
  await leadsStore.fetchStatuses();
});
</script>

<script>
export default {
  name: "Leads",
  components: {
    modal,
  },
};
</script>
