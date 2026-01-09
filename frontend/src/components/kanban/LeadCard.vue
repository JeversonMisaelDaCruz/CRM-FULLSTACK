<template>
  <v-card class="lead-card">
    <v-card-title>{{ lead.name }}</v-card-title>
    <v-card-subtitle v-if="lead.email">{{ lead.email }}</v-card-subtitle>
    <v-card-text>
      <v-select
        :items="statusOptions"
        v-model="localStatus"
        label="Alterar Fase"
        @update:model-value="handleStatusChange"
        density="compact"
        hide-details
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  lead: {
    type: Object,
    required: true
  },
  statusOptions: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update-status']);

const localStatus = ref(props.lead.pipeline_phase_id);

const handleStatusChange = (newPhaseId) => {
  emit('update-status', {
    leadId: props.lead.id,
    newPhaseId
  });
};

watch(() => props.lead.pipeline_phase_id, (newVal) => {
  localStatus.value = newVal;
});
</script>

<style scoped>
.lead-card {
  margin-top: 8px;
  border-left: 4px solid #42A5F5;
  transition: all 0.2s ease;
}

.lead-card:hover {
  border-left-color: #1976D2;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
</style>
