<template>
  <v-card>
    <v-layout>
      <Header
        :selectedPipeline="selectedPipeline"
        @toggleDrawer="drawer = !drawer"
      />

      <!-- Menu Lateral -->
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
          <template v-for="(pipeline, index) in pipelines" :key="index">
            <!-- Pipeline -->
            <v-list-item @click="selectPipeline(pipeline)">
              <div class="d-flex align-center justify-space-between w-100">
                <v-list-item-title>
                  {{ pipeline ? pipeline.name.toUpperCase() : "" }}
                </v-list-item-title>
                <v-btn icon @click.stop="confirmDelete(pipeline)" size="medium">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-list-item>
            <v-divider class="my-2" />
          </template>
        </v-list>
      </v-navigation-drawer>

      <!-- Modal de Confirmação de delete -->
      <v-dialog v-model="showConfirm" max-width="400">
        <v-card>
          <v-card-title class="text-h6">Deletar Pipeline</v-card-title>
          <v-card-text>
            Deseja realmente deletar a pipeline
            <strong>{{ pipelineToDelete ? pipelineToDelete.name : "" }}</strong>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="deletePipeline">Sim</v-btn>
            <v-btn color="grey" @click="closeConfirm">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Conteúdo Principal -->
      <v-main style="height: 100vh">
        <v-container>
          <v-row>
            <v-col cols="12" class="d-flex justify-start">
              <!-- Botão para abrir o modal de criação de Pipeline -->
              <v-btn
                v-if="!selectedPipeline"
                @click="showPipelineModal = true"
                color="primary"
              >
                Criar Pipeline
              </v-btn>
              <!-- Botão para abrir o modal de criação de Fase -->
              <v-btn
                v-if="selectedPipeline"
                @click="openPhaseModal"
                color="primary"
                class="ml-4"
              >
                Criar Quadro
              </v-btn>
            </v-col>
          </v-row>

          <!-- Modal para criação de Pipeline -->
          <v-dialog v-model="showPipelineModal" max-width="500">
            <v-card>
              <v-card-title>Cadastrar Pipeline</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="pipelineName"
                  label="Nome:"
                  required
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="createPipeline">Salvar</v-btn>
                <v-btn color="grey" @click="cancelPipelineModal">
                  Cancelar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Modal para criação de Fase -->
          <v-dialog v-model="showPhaseModal" max-width="500">
            <v-card>
              <v-card-title>Cadastrar Quadro</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="phaseName"
                  label="Nome da quadro"
                  required
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="createPhase">Salvar</v-btn>
                <v-btn color="grey" @click="closePhaseModal">Cancelar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Lista de Fases -->
          <v-list v-if="filteredPhases.length > 0" class="mt-4">
            <v-subheader>Fases da Pipeline Selecionada</v-subheader>
            <v-list-item v-for="(phase, index) in filteredPhases" :key="index">
              <v-list-item-title>{{ phase?.name || "" }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-alert v-else type="info" class="mt-4">
            Selecione uma pipeline para visualizar as fases.
          </v-alert>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { usePipelineStore } from "@/store/pipeline";
import { usePipelinePhaseStore } from "@/store/pipelinesPhases";
import { computed, onMounted, ref } from "vue";
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  setup() {
    // Reactive variables
    const drawer = ref(false);
    const showPipelineModal = ref(false);
    const showPhaseModal = ref(false);
    const showConfirm = ref(false);
    const pipelineToDelete = ref(null);
    const pipelineName = ref("");
    const phaseName = ref("");
    const selectedPipeline = ref(null);

    // Stores
    const pipelineStore = usePipelineStore();
    const pipelinePhaseStore = usePipelinePhaseStore();

    // Computed properties
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

    // Methods
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

    const createPipeline = async () => {
      if (pipelineName.value) {
        await pipelineStore.createPipeline({ name: pipelineName.value });
        pipelineName.value = "";
        showPipelineModal.value = false;
      }
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

    const cancelPipelineModal = () => {
      pipelineName.value = "";
      showPipelineModal.value = false;
    };

    const closePhaseModal = () => {
      phaseName.value = "";
      showPhaseModal.value = false;
    };

    const selectPipeline = (pipeline) => {
      selectedPipeline.value = pipeline;
    };

    const openPhaseModal = () => {
      if (!selectedPipeline.value) {
        alert("Por favor, selecione um pipeline primeiro.");
        return;
      }
      showPhaseModal.value = true;
    };

    onMounted(async () => {
      await pipelineStore.fetchPipelines();
      await pipelinePhaseStore.fetchPipelinePhases();
    });

    return {
      // Reactive variables
      drawer,
      showPipelineModal,
      showPhaseModal,
      showConfirm,
      pipelineToDelete,
      pipelineName,
      phaseName,
      selectedPipeline,

      // Computed properties
      pipelines,
      filteredPhases,

      // Methods
      confirmDelete,
      deletePipeline,
      closeConfirm,
      createPipeline,
      createPhase,
      cancelPipelineModal,
      closePhaseModal,
      selectPipeline,
      openPhaseModal,
    };
  },
};
</script>
