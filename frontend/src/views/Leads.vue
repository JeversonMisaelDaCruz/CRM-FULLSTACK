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
      <v-data-table
        :headers="headers"
        :items="leads"
        class="elevation-1 mt-4"
        item-value-color="black"
        header-value-color="black"
        style="background-color: #dfd8c3; color: black"
      >
        <template #item.actions="{ item }">
          <v-btn icon @click="openModal(item)">
            <v-icon color="black">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="handleDeleteLead(item.id)">
            <v-icon color="black">mdi-delete</v-icon>
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
import { usePipelinePhaseStore } from "../store/pipelinesPhases";
import modal from "@/components/Modals/modal.vue";

const dialog = ref(false);
const selectedLead = ref(null);
const snackbar = ref(false);
const snackbarMessage = ref("");
const drawer = ref(false);

const headers = [
  { text: "Nome", value: "name" },
  { text: "Email", value: "email" },
  { text: "Telefone", value: "phone" },
  { text: "Pipeline Phase", value: "pipelinePhase" },
  { text: "Ações", value: "actions", sortable: false },
];

const leadsStore = useLeadsStore();
const pipelinePhaseStore = usePipelinePhaseStore();

const leads = computed(() => leadsStore.leads || []);
const pipelinePhases = computed(() => pipelinePhaseStore.phases || []);

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
  try {
    await Promise.all([
      leadsStore.fetchLeads(),
      pipelinePhaseStore.fetchPipelinePhases(),
    ]);
    console.log("Leads e Pipeline Phases carregados.");
  } catch (error) {
    console.error("Erro ao carregar dados iniciais:", error);
    snackbarMessage.value = "Erro ao carregar dados iniciais.";
    snackbar.value = true;
  }
});
</script>
