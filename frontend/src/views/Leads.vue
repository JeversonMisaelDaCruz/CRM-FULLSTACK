<template>
  <v-app style="background-color: #faf3e0">
    <Header
      :selectedPipeline="selectedPipeline"
      @toggleDrawer="drawer = !drawer"
    />
    <v-container>
      <modal
        v-model="dialog"
        :leadToEdit="selectedLead"
        :pipelinePhases="pipelinePhases"
        @lead-saved="handleCreateLead"
        @lead-updated="handleUpdateLead"
      />
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
import { ref, onMounted, computed } from "vue";
import { useLeadsStore } from "@/store/leads";
import modal from "@/components/modal.vue";

const dialog = ref(false);
const selectedLead = ref(null);
const snackbar = ref(false);
const snackbarMessage = ref("");

const headers = [
  { text: "Nome", value: "name" },
  { text: "Email", value: "email" },
  { text: "Telefone", value: "phone" },
  { text: "Pipeline Phase", value: "pipelinePhase" },
  { text: "Ações", value: "actions", sortable: false },
];

const leadsStore = useLeadsStore();

const leads = computed(() => leadsStore.leads);
const pipelinePhases = computed(() => leadsStore.PipelinePhase || []);

const openModal = (lead = null) => {
  selectedLead.value = lead;
  dialog.value = true;
};

const handleCreateLead = async (leadData) => {
  try {
    await leadsStore.createLead(leadData);
    snackbarMessage.value = "Lead criado com sucesso!";
    snackbar.value = true;
    dialog.value = false;
  } catch (error) {
    console.error("Erro ao criar lead:", error);
    snackbarMessage.value = "Erro ao criar lead";
    snackbar.value = true;
  }
};

const handleUpdateLead = async (leadData) => {
  try {
    await leadsStore.updateLead(leadData);
    snackbarMessage.value = "Lead atualizado com sucesso!";
    snackbar.value = true;
    dialog.value = false;
  } catch (error) {
    console.error("Erro ao atualizar lead:", error);
    snackbarMessage.value = "Erro ao atualizar lead";
    snackbar.value = true;
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

onMounted(async () => {
  await Promise.all([
    leadsStore.fetchLeads(),
    leadsStore.fetchPipelinePhases(),
  ]);
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
