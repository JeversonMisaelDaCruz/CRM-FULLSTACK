<template>
  <v-card style="background-color: #faf3e0">
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
              <div
                v-for="phase in filteredPhases"
                :key="phase.id"
                class="kanban-column"
              >
                <p class="phase-name">{{ phase.name }}</p>
                <div v-if="getLeadsByPhase(phase.id).length > 0">
                  <v-card
                    v-for="lead in getLeadsByPhase(phase.id)"
                    :key="lead.id"
                    class="lead-card"
                  >
                    <v-card-title>{{ lead.name }}</v-card-title>
                    <v-card-text>
                      <v-select
                        :items="statusOptions"
                        v-model="lead.pipeline_phase_id"
                        label="Alterar Fase"
                        @change="
                          updateLeadStatus(lead.id, lead.pipeline_phase_id)
                        "
                      ></v-select>
                    </v-card-text>
                  </v-card>
                </div>
                <p v-else>Nenhum lead nesta fase.</p>
              </div>
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
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { usePipelineStore } from "@/store/pipeline";
import { usePipelinePhaseStore } from "@/store/pipelinesPhases";
import { useLeadsStore } from "@/store/leads";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import Warn from "@/components/warn/warn.vue";
import CreatePipelineButton from "@/components/buttons/CreatePipelineButton.vue";

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

const pipelineStore = usePipelineStore();
const pipelinePhaseStore = usePipelinePhaseStore();
const leadsStore = useLeadsStore();

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
    phaseName.value = "";
    showPhaseModal.value = false;
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

watch(
  () => route.query.pipelineId,
  (newPipelineId) => {
    if (newPipelineId) {
      selectedPipeline.value = pipelines.value.find(
        (pipeline) => pipeline.id === newPipelineId
      );
    }
  }
);

onMounted(async () => {
  await pipelineStore.fetchPipelines();
  await pipelinePhaseStore.fetchPipelinePhases();
  await leadsStore.fetchLeads();

  const pipelineId = route.query.pipelineId;
  if (pipelineId) {
    selectedPipeline.value = pipelines.value.find(
      (pipeline) => pipeline.id === pipelineId
    );
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
