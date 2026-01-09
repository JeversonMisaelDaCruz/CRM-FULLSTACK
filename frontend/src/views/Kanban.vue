<template>
  <v-card style="background-color: #faf3e0">
    <v-overlay v-model="loading" class="align-center justify-center" persistent>
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <v-layout>
      <v-dialog v-model="showConfirm" max-width="400">
        <v-card>
          <v-card-title class="text-h6">Deletar Pipeline</v-card-title>
          <v-card-text>
            Deseja realmente deletar a pipeline
            <strong>{{ pipelineToDelete?.name || "" }}</strong>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="red" @click="deletePipeline">Sim</v-btn>
            <v-btn color="grey" @click="closeConfirm">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-main
        :style="{
          marginLeft: drawer ? '250px' : '0px',
          transition: 'margin-left 0.3s ease',
        }"
        style="height: 100vh"
      >
        <div class="d-flex flex-column" style="margin: 40px 0px 0px 40px">
          <CreatePipelineButton @create-pipeline="showPipelineModal = true" />

          <v-row class="d-flex flex-column">
            <v-col>
              <v-btn
                v-if="selectedPipeline"
                @click="showPipelineModal"
                color="primary"
                class="ga-1"
              >
                Criar Quadro
              </v-btn>
            </v-col>

            <v-row class="kanban-container">
              <KanbanColumn
                v-for="phase in filteredPhases"
                :key="phase.id"
                :phase="phase"
                :leads="getLeadsByPhase(phase.id)"
                :statusOptions="statusOptions"
                @add-lead="openLeadModal"
                @update-lead-status="handleUpdateLeadStatus"
              />
            </v-row>
          </v-row>
        </div>

        <CreatePipeline
          :showPipelineModal="showPipelineModal"
          :pipelineName="pipelineName"
          @createPipeline="handleCreatePipeline"
          @cancelPipelineModal="cancelPipelineModal"
        />

        <v-dialog v-model="showPhaseModal" max-width="500">
          <v-card>
            <v-card-title>Cadastrar Quadro</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="phaseName"
                label="Nome da Quadro"
                required
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="createPhase">Salvar</v-btn>
              <v-btn color="grey" @click="closePhaseModal">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <LeadModal
          v-model="showLeadModal"
          :pipelinePhases="filteredPhases"
          :preselectedPhaseId="selectedPhaseId"
          @save-lead="handleCreateLead"
        />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { usePipelineStore } from "@/store/pipeline";
import { usePipelinePhaseStore } from "@/store/pipelinesPhases";
import { useLeadsStore } from "@/store/leads";
import { useAuthStore } from "@/store/auth/User";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import CreatePipelineButton from "@/components/buttons/CreatePipelineButton.vue";
import LeadModal from "@/components/Modals/Leadmodal.vue";
import KanbanColumn from "@/components/kanban/KanbanColumn.vue";
import PhaseModal from "@/components/kanban/PhaseModal.vue";

const router = useRouter();
const route = useRoute();
const pipelineName = ref("");
const drawer = ref(false);
const showPipelineModal = ref(false);
const showPhaseModal = ref(false);
const showConfirm = ref(false);
const pipelineToDelete = ref(null);
const phaseName = ref("");
const selectedPipeline = ref(null);
const showLeadModal = ref(false);
const selectedPhaseId = ref(null);
const loading = ref(false);

const pipelineStore = usePipelineStore();
const pipelinePhaseStore = usePipelinePhaseStore();
const leadsStore = useLeadsStore();
const authStore = useAuthStore();

const pipelines = computed(() =>
  Array.isArray(pipelineStore.pipeline) ? pipelineStore.pipeline : []
);

const filteredPhases = computed(() => {
  if (!selectedPipeline.value || !Array.isArray(pipelinePhaseStore.phases))
    return [];
  return pipelinePhaseStore.phases.filter(
    (phase) => phase?.pipeline_id === selectedPipeline.value.id
  );
});

const confirmDelete = (pipeline) => {
  pipelineToDelete.value = pipeline;
  showConfirm.value = true;
};

const deletePipeline = async () => {
  if (pipelineToDelete.value) {
    try {
      await pipelineStore.deletePipeline(pipelineToDelete.value.id);
      pipelineToDelete.value = null;
      showConfirm.value = false;
    } catch (error) {
      console.error("Erro ao deletar pipeline:", error);
    }
  }
};

const closeConfirm = () => {
  showConfirm.value = false;
};

const handleCreatePipeline = async (pipelineName) => {
  try {
    const userId = authStore.user?.id;
    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    await pipelineStore.createPipeline({
      name: pipelineName,
      userIds: [userId],
    });
    showPipelineModal.value = false;
  } catch (error) {
    console.error("Erro ao criar pipeline:", error);
  }
};

const cancelPipelineModal = () => {
  showPipelineModal.value = false;
};

const createPhase = async () => {
  if (!selectedPipeline.value || !phaseName.value) return;

  try {
    await pipelinePhaseStore.createPipelinePhase({
      name: phaseName.value,
      pipeline_id: selectedPipeline.value.id,
    });

    // Força atualização imediata para renderizar nova fase
    await pipelinePhaseStore.fetchPipelinePhases();

    phaseName.value = "";
    showPhaseModal.value = false;
    console.log("Fase criada e renderizada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar fase:", error);
  }
};

const closePhaseModal = () => {
  phaseName.value = "";
  showPhaseModal.value = false;
};

const selectPipeline = (pipeline) => {
  selectedPipeline.value = pipeline;
  router.push({ path: "/kanban", query: { pipelineId: pipeline.id } });
};

const getLeadsByPhase = (phaseId) => {
  return leadsStore.leads.filter((lead) => lead.pipeline_phase_id === phaseId);
};

const statusOptions = computed(() =>
  filteredPhases.value.map((phase) => ({
    text: phase.name,
    value: phase.id,
  }))
);

const updateLeadStatus = async (leadId, newPhaseId) => {
  try {
    await leadsStore.updateLead(leadId, { pipeline_phase_id: newPhaseId });
    console.log("Lead atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar o lead:", error);
  }
};

const openLeadModal = (phaseId) => {
  selectedPhaseId.value = phaseId;
  showLeadModal.value = true;
};

const handleCreateLead = async (leadData) => {
  try {
    await leadsStore.createLead({
      ...leadData,
      user_id: authStore.user?.id,
      pipeline_phase_id: selectedPhaseId.value,
    });
    showLeadModal.value = false;
    console.log("Lead criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar lead:", error);
  }
};

const loadPipelineData = async (pipelineId) => {
  if (!pipelineId) return;

  try {
    loading.value = true;
    await Promise.all([
      pipelinePhaseStore.fetchPipelinePhases(),
      leadsStore.fetchLeads()
    ]);
    console.log("Dados do pipeline carregados com sucesso!");
  } catch (error) {
    console.error("Erro ao carregar dados do pipeline:", error);
  } finally {
    loading.value = false;
  }
};

watch(
  () => route.query.pipelineId,
  async (newPipelineId) => {
    if (newPipelineId) {
      selectedPipeline.value = pipelines.value.find(
        (pipeline) => pipeline.id === newPipelineId
      );
      await loadPipelineData(newPipelineId);
    }
  }
);

onMounted(async () => {
  loading.value = true;
  try {
    await pipelineStore.fetchPipelines();

    const pipelineId = route.query.pipelineId;
    if (pipelineId) {
      selectedPipeline.value = pipelines.value.find(
        (pipeline) => pipeline.id === pipelineId
      );
      await loadPipelineData(pipelineId);
    } else {
      // Se não há pipeline selecionado, carrega apenas os dados gerais
      await Promise.all([
        pipelinePhaseStore.fetchPipelinePhases(),
        leadsStore.fetchLeads()
      ]);
    }
  } catch (error) {
    console.error("Erro ao carregar dados iniciais:", error);
  } finally {
    loading.value = false;
  }
});
</script>
<style>
.column-width {
  min-width: 320px;
  width: 320px;
}
.kanban-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 16px;
  padding: 16px;
}

.kanban-column {
  min-width: 320px;
  background-color: black;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.phase-name {
  font-weight: bold;
  margin-bottom: 12px;
}

.lead-card {
  margin-top: 8px;
}
</style>
