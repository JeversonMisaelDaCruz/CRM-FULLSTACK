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

    <VueDraggable
      v-model="localLeads"
      :group="{ name: 'leads', pull: true, put: true }"
      :animation="200"
      ghost-class="ghost-card"
      drag-class="drag-card"
      class="leads-container"
      item-key="id"
      @end="handleDragEnd"
      :data-phase-id="phase.id"
    >
      <template #item="{ element }">
        <LeadCard
          :lead="element"
          :statusOptions="statusOptions"
          @update-status="$emit('update-lead-status', $event)"
        />
      </template>
    </VueDraggable>

    <p v-if="leads.length === 0" class="no-leads">Nenhum lead nesta fase.</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { VueDraggable } from 'vuedraggable';
import LeadCard from './LeadCard.vue';

const props = defineProps({
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

const emit = defineEmits(['add-lead', 'update-lead-status']);

// Local state para permitir manipulação pelo VueDraggable
const localLeads = ref([...props.leads]);

// Sincronizar com props quando leads mudar
watch(() => props.leads, (newLeads) => {
  localLeads.value = [...newLeads];
}, { deep: true });

const handleDragEnd = (event) => {
  const { item, from, to } = event;

  // Verificar se mudou de coluna
  const fromPhaseId = from.dataset.phaseId;
  const toPhaseId = to.dataset.phaseId;

  if (fromPhaseId !== toPhaseId) {
    const leadId = item.dataset.leadId;
    emit('update-lead-status', { leadId, newPhaseId: toPhaseId });
  }
};
</script>

<style scoped>
.kanban-column {
  min-width: 340px;
  max-width: 340px;
  background: rgb(var(--v-theme-surface));
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.kanban-column:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  border-color: rgba(99, 102, 241, 0.2);
}

.phase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(99, 102, 241, 0.15);
}

.phase-name {
  font-weight: 700;
  font-size: 16px;
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.leads-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 120px;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.leads-container:hover {
  background-color: rgba(99, 102, 241, 0.03);
}

.no-leads {
  color: rgb(var(--v-theme-on-surface-variant));
  font-style: italic;
  text-align: center;
  padding: 32px 20px;
  margin: 0;
  font-size: 14px;
  opacity: 0.7;
}

/* Estilos de drag */
:deep(.ghost-card) {
  opacity: 0.5;
  background: rgba(99, 102, 241, 0.2);
  border: 2px dashed #6366F1;
}

:deep(.drag-card) {
  opacity: 0.9;
  transform: rotate(3deg);
  cursor: grabbing;
}
</style>
