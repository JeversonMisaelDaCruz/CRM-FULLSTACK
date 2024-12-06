<template>
  <v-card style="background-color: #faf3e0">
    <v-layout>

      <Header
        :selectedPipeline="selectedPipeline"
        @toggleDrawer="drawer = !drawer"
      />

      <NavigationDrawer
        :pipelines="pipelines"
        :drawer="drawer"
        @closeDrawer="drawer = false"
        @selectPipeline="selectPipeline"
        @confirmDelete="confirmDelete"
      />

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
          <CreatePipelineButton
            :selectedPipeline="selectedPipeline"
            @create-pipeline="showPipelineModal = true"
          />

          <v-row class="d-flex flex-column">
            <v-col>
              <v-btn
                v-if="selectedPipeline"
                @click="openPhaseModal"
                color="#B8AD90"
                class="ml-4"
              >
                Criar Quadro
              </v-btn>
            </v-col>

            <v-col>
              <v-list
                v-if="filteredPhases.length > 0"
                class="mt-4"
                style="
                  background-color: #b8ad90;
                  border-radius: 6px;
                  padding: 10px;
                "
              >
                <h2>Fases da Pipeline Selecionada</h2>
                <v-list-item
                  v-for="(phase, index) in filteredPhases"
                  :key="index"
                >
                  <v-list-item-title>{{ phase?.name || "" }}</v-list-item-title>
                </v-list-item>
              </v-list>
              <Warn v-else />
            </v-col>
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

<script>
import { usePipelineStore } from "@/store/pipeline";
import { usePipelinePhaseStore } from "@/store/pipelinesPhases";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import CreatePipeline from "@/components/CreatePipeline.vue";
import Warn from "@/components/warn/warn.vue";
import CreatePipelineButton from "@/components/buttons/CreatePipelineButton.vue";

export default {
  components: {
    Header,
    NavigationDrawer,
    CreatePipeline,
    Warn,
    CreatePipelineButton,
  },
  setup() {
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

      const pipelineId = route.query.pipelineId;
      if (pipelineId) {
        selectedPipeline.value = pipelines.value.find(
          (pipeline) => pipeline.id === pipelineId
        );
      }
    });

    return {
      drawer,
      showPipelineModal,
      showPhaseModal,
      showConfirm,
      pipelineToDelete,
      phaseName,
      selectedPipeline,
      pipelines,
      filteredPhases,
      confirmDelete,
      deletePipeline,
      closeConfirm,
      pipelineName,
      handleCreatePipeline,
      cancelPipelineModal,
      createPhase,
      closePhaseModal,
      selectPipeline,
    };
  },
};
</script>
