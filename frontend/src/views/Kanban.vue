<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>CRM</v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
          <v-list-item
            v-for="(pipeline, index) in pipelines"
            :key="index"
            @click="selectPipeline(pipeline)"
          >
            <v-list-item-title>{{ pipeline.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
        <v-container>
          <v-btn @click="showModal = true" color="primary">
            Criar Pipeline
          </v-btn>
          <!-- Modal para criar pipeline -->
          <v-dialog v-model="showModal" max-width="500">
            <v-card>
              <v-card-title>Cadastrar Pipeline</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="pipelineName"
                  label="Nome da Pipeline"
                  required
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="createPipeline">Salvar</v-btn>
                <v-btn color="grey" @click="cancelModal">Cancelar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { ref, computed } from "vue";
import { usePipelineStore } from "@/store/pipeline";

export default {
  setup() {
    const drawer = ref(false);
    const showModal = ref(false);
    const pipelineName = ref("");
    const pipelineStore = usePipelineStore();

    const pipelines = computed(() => pipelineStore.pipeline);

    const createPipeline = async () => {
      if (pipelineName.value) {
        await pipelineStore.createPipeline({ name: pipelineName.value });
        pipelineName.value = "";
        showModal.value = false;
      }
    };

    const cancelModal = () => {
      pipelineName.value = "";
      showModal.value = false;
    };

    const selectPipeline = (pipeline) => {
      console.log("Pipeline selecionada:", pipeline);
    };

    return {
      drawer,
      showModal,
      pipelineName,
      pipelines,
      createPipeline,
      cancelModal,
      selectPipeline,
    };
  },
};
</script>
