<template>
  <v-dialog v-model="localShow" max-width="500">
    <v-card>
      <v-card-title>Cadastrar Quadro</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="phaseName"
          label="Nome do Quadro"
          :rules="[rules.required]"
          @keyup.enter="handleSave"
          outlined
          dense
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          @click="handleSave"
          :disabled="!phaseName"
        >
          Salvar
        </v-btn>
        <v-btn color="grey" @click="handleCancel">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  pipelineId: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'create-phase']);

const phaseName = ref('');
const rules = {
  required: (v) => !!v || 'Campo obrigatório'
};

const localShow = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const handleSave = () => {
  if (phaseName.value && props.pipelineId) {
    emit('create-phase', {
      name: phaseName.value,
      pipeline_id: props.pipelineId
    });
    phaseName.value = '';
    localShow.value = false;
  }
};

const handleCancel = () => {
  phaseName.value = '';
  localShow.value = false;
};
</script>

<style scoped>
/* Estilos customizados se necessário */
</style>
