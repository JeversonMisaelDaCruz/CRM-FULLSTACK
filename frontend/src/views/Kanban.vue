<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>CRM</v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-dots-vertical" variant="text" />
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
          <v-list-item
            v-for="(pipeline, index) in pipelines"
            :key="index"
            @click="selectPipeline(pipeline)"
          >
            <v-list-item-title>{{
              pipeline.name.toUpperCase()
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh">
        <v-container>
          <!-- Botão para abrir o modal de criação de pipeline -->
          <v-btn @click="showPipelineModal = true" color="primary">
            Criar Pipeline
          </v-btn>

          <!-- Modal para criação de pipeline -->
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
                <v-btn color="grey" @click="cancelPipelineModal"
                  >Cancelar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Botão para criar Fases (Pipeline Phases) -->
          <v-btn @click="openPhaseModal" color="secondary" class="mt-4">
            Criar Fase
          </v-btn>

          <!-- Modal para criação de fases -->
          <CreatePipelinePhaseModal
            v-model:show="showPhaseModal"
            :pipeline="selectedPipeline"
          />

          <!-- Lista de fases da pipeline selecionada -->
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
import CreatePipelinePhaseModal from "../components/CreatePipelinePhaseModal.vue";

export default {
  components: {
    CreatePipelinePhaseModal,
  },
  setup() {
    const drawer = ref(false);
    const showPipelineModal = ref(false);
    const showPhaseModal = ref(false);
    const pipelineName = ref("");
    const selectedPipeline = ref(null);

    const pipelineStore = usePipelineStore();
    const pipelinePhaseStore = usePipelinePhaseStore();

    const pipelines = computed(() => {
      console.log("Pipelines carregadas no store:", pipelineStore.pipeline);
      return pipelineStore.pipeline;
    });

    const filteredPhases = computed(() => {
      if (!selectedPipeline.value) {
        console.log("Nenhuma pipeline selecionada. Sem fases filtradas.");
        return [];
      }

      console.log("ID da pipeline selecionada:", selectedPipeline.value.id);
      console.log("Pipeline phases no store:", pipelinePhaseStore.phases);

      const phases = pipelinePhaseStore.phases.filter(
        (phase) => phase.pipeline_id === selectedPipeline.value.id
      );

      console.log(
        `Fases filtradas para a pipeline ${selectedPipeline.value.name}:`,
        phases
      );

      return phases;
    });
    const createPipeline = async () => {
      if (pipelineName.value) {
        try {
          console.log("Criando pipeline com nome:", pipelineName.value);
          await pipelineStore.createPipeline({ name: pipelineName.value });
          console.log("Pipeline criada com sucesso!");
          pipelineName.value = "";
          showPipelineModal.value = false;
        } catch (error) {
          console.error("Erro ao criar pipeline:", error);
        }
      } else {
        console.warn("Nome da pipeline está vazio. Operação abortada.");
      }
    };

    const cancelPipelineModal = () => {
      console.log("Cancelando modal de criação de pipeline.");
      pipelineName.value = "";
      showPipelineModal.value = false;
    };

    const selectPipeline = (pipeline) => {
      console.log("Selecionando pipeline:", pipeline);
      drawer.value = false;
      selectedPipeline.value = pipeline;
    };

    const openPhaseModal = () => {
      if (!selectedPipeline.value) {
        console.warn("Nenhuma pipeline selecionada. Operação abortada.");
        alert("Por favor, selecione um pipeline primeiro.");
        return;
      }
      console.log(
        "Abrindo modal para criação de fase na pipeline:",
        selectedPipeline.value
      );
      showPhaseModal.value = true;
    };

    onMounted(async () => {
      try {
        console.log("Carregando pipelines e fases...");
        await pipelineStore.fetchPipelines();
        console.log("Pipelines carregadas:", pipelineStore.pipeline);

        await pipelinePhaseStore.fetchPipelinePhases();
        console.log("Fases carregadas:", pipelinePhaseStore.phases);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    });
    return {
      drawer,
      showPipelineModal,
      showPhaseModal,
      pipelineName,
      selectedPipeline,
      pipelines,
      filteredPhases,
      createPipeline,
      cancelPipelineModal,
      selectPipeline,
      openPhaseModal,
    };
  },
};
</script>
