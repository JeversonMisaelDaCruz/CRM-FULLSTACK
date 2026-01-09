<template>
  <div class="kanban-column">
    <div class="phase-header">
      <p class="phase-name">{{ phase.name }}</p>
      <v-btn
        icon="mdi-plus"
        size="small"
        color="white"
        @click="$emit('add-lead', phase.id)"
      />
    </div>

    <div v-if="leads.length > 0" class="leads-container">
      <LeadCard
        v-for="lead in leads"
        :key="lead.id"
        :lead="lead"
        :statusOptions="statusOptions"
        @update-status="$emit('update-lead-status', $event)"
      />
    </div>
    <p v-else class="no-leads">Nenhum lead nesta fase.</p>
  </div>
</template>

<script setup>
import LeadCard from './LeadCard.vue';

defineProps({
  phase: {
    type: Object,
    required: true
  },
  leads: {
    type: Array,
    default: () => []
  },
  statusOptions: {
    type: Array,
    default: () => []
  }
});

defineEmits(['add-lead', 'update-lead-status']);
</script>

<style scoped>
.kanban-column {
  min-width: 320px;
  background-color: black;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.phase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.phase-name {
  font-weight: bold;
  color: white;
  margin: 0;
}

.leads-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.no-leads {
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  text-align: center;
  padding: 20px;
  margin: 0;
}
</style>
