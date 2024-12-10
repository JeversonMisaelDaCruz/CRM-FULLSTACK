<template>
  <v-dialog :value="show" max-width="500" @input="updateShow">
    <v-card>
      <v-card-title>Cadastrar Quadro</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="phaseName"
          label="Nome do quadro"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="createPhase">Salvar</v-btn>
        <v-btn color="grey" @click="closeModal">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from "vue";
import { usePipelinePhaseStore } from "../store/pipelinesPhases";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    pipeline: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:show"],
  setup(props, { emit }) {
    const phaseName = ref("");
    const pipelinePhaseStore = usePipelinePhaseStore();

    const createPhase = async () => {
      if (phaseName.value && props.pipeline) {
        try {
          await pipelinePhaseStore.createPipelinePhase({
            name: phaseName.value,
            pipeline_id: props.pipeline.id,
          });
          phaseName.value = "";
          closeModal();
        } catch (error) {
          console.error("Erro ao criar fase:", error);
        }
      }
    };

    const closeModal = () => {
      emit("update:show", false);
    };

    const updateShow = (value) => {
      emit("update:show", value);
    };

    return {
      phaseName,
      createPhase,
      closeModal,
      updateShow,
    };
  },
};
</script>
