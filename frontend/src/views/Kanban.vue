<template>
  <v-card>
    <v-layout>
      <!-- Barra de Navegação -->
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
            <v-list-item-title>{{
              pipeline.name.toUpperCase()
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Conteúdo Principal -->
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

          <!-- Modal para criação de fases (pipeline phases) -->
          <CreatePipelinePhaseModal
            v-model:show="showPhaseModal"
            :pipeline="selectedPipeline"
          />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { usePipelineStore } from "@/store/pipeline";
import { computed, onMounted, ref } from "vue";
import CreatePipelinePhaseModal from "../components/CreatePipelinePhaseModal.vue";
import { usePipelinePhaseStore } from "../store/pipelinesPhases";

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

    const pipelines = computed(() => pipelineStore.pipeline);

    const createPipeline = async () => {
      if (pipelineName.value) {
        try {
          await pipelineStore.createPipeline({ name: pipelineName.value });
          pipelineName.value = "";
          showPipelineModal.value = false;
        } catch (error) {
          console.error("Erro ao criar pipeline:", error);
        }
      }
    };

    const cancelPipelineModal = () => {
      pipelineName.value = "";
      showPipelineModal.value = false;
    };

    const selectPipeline = (pipeline) => {
      drawer.value = false;
      selectedPipeline.value = pipeline;
      console.log("Pipeline selecionada:", pipeline);
    };

    const openPhaseModal = () => {
      if (!selectedPipeline.value) {
        alert("Por favor, selecione um pipeline primeiro.");
        return;
      }
      showPhaseModal.value = true;
    };

    onMounted(async () => {
      try {
        await pipelineStore.fetchPipelines();
      } catch (error) {
        console.error("Erro ao carregar pipelines:", error);
      }
    });

    return {
      drawer,
      showPipelineModal,
      showPhaseModal,
      pipelineName,
      selectedPipeline,
      pipelines,
      createPipeline,
      cancelPipelineModal,
      selectPipeline,
      openPhaseModal,
    };
  },
};
</script>
