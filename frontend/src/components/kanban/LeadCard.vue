<template>
  <v-card
    class="lead-card"
    :class="{ 'editing': isEditing }"
    :data-lead-id="lead.id"
    :style="{ cursor: isEditing ? 'default' : 'grab' }"
    v-click-outside="handleClickOutside"
  >
    <!-- MODO VISUALIZAÇÃO -->
    <template v-if="!isEditing">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ lead.name }}</span>
        <v-btn
          icon="mdi-pencil"
          size="x-small"
          variant="text"
          @click.stop="enterEditMode"
        />
      </v-card-title>

      <v-card-subtitle v-if="lead.email">
        <v-icon size="small">mdi-email</v-icon>
        {{ lead.email }}
      </v-card-subtitle>

      <v-card-text v-if="lead.phone">
        <v-icon size="small">mdi-phone</v-icon>
        {{ lead.phone }}
      </v-card-text>
    </template>

    <!-- MODO EDIÇÃO -->
    <template v-else>
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="saveChanges">
          <v-text-field
            v-model="editData.name"
            label="Nome*"
            density="compact"
            variant="outlined"
            :rules="[rules.required]"
            autofocus
            @keydown.enter="saveChanges"
            @keydown.esc="cancelEdit"
          />

          <v-text-field
            v-model="editData.email"
            label="E-mail"
            density="compact"
            variant="outlined"
            :rules="[rules.email]"
            @keydown.enter="saveChanges"
            @keydown.esc="cancelEdit"
          />

          <v-text-field
            v-model="editData.phone"
            label="Telefone"
            density="compact"
            variant="outlined"
            @keydown.enter="saveChanges"
            @keydown.esc="cancelEdit"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end pa-2">
        <v-btn
          size="small"
          color="grey"
          variant="text"
          @click="cancelEdit"
        >
          Cancelar
        </v-btn>
        <v-btn
          size="small"
          color="primary"
          variant="flat"
          @click="saveChanges"
          :loading="saving"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useLeadsStore } from '@/store/leads';

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

const emit = defineEmits(['update-status', 'update-lead']);
const leadsStore = useLeadsStore();

const isEditing = ref(false);
const saving = ref(false);
const formRef = ref(null);

const editData = reactive({
  name: '',
  email: '',
  phone: ''
});

const rules = {
  required: (value) => !!value || 'Campo obrigatório',
  email: (value) => {
    if (!value) return true; // Opcional
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || 'E-mail inválido';
  }
};

const enterEditMode = () => {
  // Clonar dados atuais para edição
  editData.name = props.lead.name;
  editData.email = props.lead.email || '';
  editData.phone = props.lead.phone || '';
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
  // Resetar dados
  editData.name = '';
  editData.email = '';
  editData.phone = '';
};

const saveChanges = async () => {
  // Validar formulário
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  // Verificar se houve mudanças
  const hasChanges =
    editData.name !== props.lead.name ||
    editData.email !== (props.lead.email || '') ||
    editData.phone !== (props.lead.phone || '');

  if (!hasChanges) {
    cancelEdit();
    return;
  }

  try {
    saving.value = true;

    // Preparar dados apenas com campos que mudaram
    const updateData = {};
    if (editData.name !== props.lead.name) updateData.name = editData.name;
    if (editData.email !== (props.lead.email || '')) updateData.email = editData.email;
    if (editData.phone !== (props.lead.phone || '')) updateData.phone = editData.phone;

    await leadsStore.updateLead(props.lead.id, updateData);

    isEditing.value = false;
    console.log('Lead atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar lead:', error);
    alert('Erro ao salvar alterações. Tente novamente.');
  } finally {
    saving.value = false;
  }
};

const handleClickOutside = () => {
  if (isEditing.value) {
    saveChanges();
  }
};

// Atualizar editData se o lead mudar externamente
watch(() => props.lead, (newLead) => {
  if (!isEditing.value) {
    editData.name = newLead.name;
    editData.email = newLead.email || '';
    editData.phone = newLead.phone || '';
  }
}, { deep: true });
</script>

<style scoped>
.lead-card {
  margin: 0;
  border-left: 4px solid #6366F1;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: grab;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  overflow: hidden;
}

.lead-card:not(.editing):active {
  cursor: grabbing;
  transform: rotate(2deg) scale(0.98);
}

.lead-card.editing {
  border-left-color: #F59E0B;
  box-shadow: 0 8px 16px rgba(245, 158, 11, 0.2);
  cursor: default;
  transform: scale(1.02);
}

.lead-card:hover:not(.editing) {
  border-left-color: #4F46E5;
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.15);
}

/* Ícones com cor primária */
.v-icon {
  color: #6366F1;
}

/* Card title */
.v-card-title {
  font-weight: 600;
  font-size: 15px;
  color: #111827;
  padding: 12px 16px 8px;
}

.v-card-subtitle {
  font-size: 13px;
  color: #6B7280;
  padding: 0 16px 4px;
}

.v-card-text {
  font-size: 13px;
  color: #6B7280;
  padding: 4px 16px 12px;
}

/* Animação de loading ao salvar */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.lead-card.saving {
  animation: pulse 1.5s infinite;
}
</style>
