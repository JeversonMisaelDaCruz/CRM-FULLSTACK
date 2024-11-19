<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>CRM</v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-dots-vertical" variant="text" />
      </v-app-bar>

      <!-- Menu Lateral -->
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
          <v-list-item
            v-for="(pipeline, index) in pipelines"
            :key="index"
            @click="selectPipeline(pipeline)"
          >
            <v-list-item-title>
              {{ pipeline.name.toUpperCase() }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Conteúdo Principal -->
      <v-main style="height: 100vh">
        <v-container>
          <v-row>
            <v-col class="text-left">
              <!-- Botão para abrir o modal de criação de Pipeline -->
              <v-btn @click="showPipelineModal = true" color="primary">
                Criar Pipeline
              </v-btn>
            </v-col>
            <v-col class="text-right">
              <!-- Botão para abrir o modal de criação de Fase -->
              <v-btn
                v-if="selectedPipeline"
                @click="openPhaseModal"
                color="secondary"
              >
                Criar Fase
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
              <v-card-title>Cadastrar Fase</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="phaseName"
                  label="Nome da Fase"
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
              <v-list-item-title>{{ phase.name }}</v-list-item-title>
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

export default {
  setup() {
    const drawer = ref(false);
    const showPipelineModal = ref(false);
    const showPhaseModal = ref(false);
    const pipelineName = ref("");
    const phaseName = ref("");
    const selectedPipeline = ref(null);
    const pipelineStore = usePipelineStore();
    const pipelinePhaseStore = usePipelinePhaseStore();
    const pipelines = computed(() => pipelineStore.pipeline);

    const filteredPhases = computed(() => {
      if (!selectedPipeline.value || !Array.isArray(pipelinePhaseStore.phases))
        return [];
      return pipelinePhaseStore.phases.filter(
        (phase) => phase?.pipeline_id === selectedPipeline.value.id
      );
    });

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
      drawer,
      showPipelineModal,
      showPhaseModal,
      pipelineName,
      phaseName,
      selectedPipeline,
      pipelines,
      filteredPhases,
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
