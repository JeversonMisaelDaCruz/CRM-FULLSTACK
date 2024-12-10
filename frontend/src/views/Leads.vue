<template>
  <v-app style="background-color: #faf3e0">
    <Header @toggleDrawer="drawer = !drawer" />
    <v-container>
      <Modal
        v-model="dialog"
        :pipelinePhases="pipelinePhases"
        :title="modalTitle"
        :confirmButtonText="modalButtonText"
        @save-lead="handleSaveLead"
      />
      <v-data-table
        :headers="headers"
        :items="leads"d
        class="elevation-1 mt-4"
        style="background-color: #dfd8c3; color: black"
      >
        <template #item.actions="{ item }">
          <div class="d-flex ga-4">
            <v-icon color="blue" @click="openEditModal(item)" size="23"
              >mdi-pencil</v-icon
            >
            <v-icon color="error" @click="handleDeleteLead(item.id)" size="23"
              >mdi-trash-can
            </v-icon>
          </div>
        </template>
      </v-data-table>
      <v-btn class="mt-4" color="#B8AD90" @click="openCreateModal">
        Cadastrar Lead
      </v-btn>
      <v-snackbar v-model="snackbar" :timeout="3000" top right>
        {{ snackbarMessage }}
        <v-btn color="red" text @click="snackbar = false">Fechar</v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Modal from "@/components/Modals/Leadmodal.vue";
import { useLeadsStore } from "@/store/leads";
import { usePipelinePhaseStore } from "@/store/pipelinesPhases";

const dialog = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref("");
const drawer = ref(false);
const selectedLead = ref(null);
const modalTitle = ref("Cadastrar Lead");
const modalButtonText = ref("Criar");
const leadsStore = useLeadsStore();
const pipelinePhaseStore = usePipelinePhaseStore();
const leads = computed(() => leadsStore.leads || []);
const pipelinePhases = computed(() => pipelinePhaseStore.phases || []);
const headers = [
  { text: "Nome", value: "name" },
  { text: "Email", value: "email" },
  { text: "Telefone", value: "phone" },
  { text: "Pipeline Phase", value: "pipelinePhase" },
  { text: "Ações", value: "actions", sortable: false },
];

const openCreateModal = () => {
  selectedLead.value = null;
  modalTitle.value = "Cadastrar Lead";
  modalButtonText.value = "Criar";
  dialog.value = true;
};

const openEditModal = (lead) => {
  const filteredLead = {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    pipeline_phase_id: lead.pipeline_phase_id,
  };

  selectedLead.value = { ...filteredLead };
  console.log("Editando lead:", filteredLead);
  modalTitle.value = "Editar Lead";
  modalButtonText.value = "Salvar";
  dialog.value = true;
};
const handleSaveLead = async (leadData) => {
  try {
    const isUpdating = !!selectedLead.value;
    const { id, ...payload } = isUpdating
      ? { ...selectedLead.value, ...leadData }
      : leadData;

    const response = isUpdating
      ? await leadsStore.updateLead(id, payload)
      : await leadsStore.createLead(payload);

    console.log(
      isUpdating ? "Lead atualizado com sucesso!" : "Lead criado com sucesso!",
      response
    );

    snackbarMessage.value = isUpdating
      ? "Lead atualizado com sucesso!"
      : "Lead criado com sucesso!";
    snackbar.value = true;
    dialog.value = false;
  } catch (error) {
    console.error("Erro ao salvar lead:", error);
    snackbarMessage.value = "Erro ao salvar lead.";
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
    snackbarMessage.value = "Erro ao deletar lead.";
    snackbar.value = true;
  }
};

onMounted(async () => {
  try {
    await Promise.all([
      leadsStore.fetchLeads(),
      pipelinePhaseStore.fetchPipelinePhases(),
    ]);
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    snackbarMessage.value = "Erro ao carregar dados.";
    snackbar.value = true;
  }
});
</script>
