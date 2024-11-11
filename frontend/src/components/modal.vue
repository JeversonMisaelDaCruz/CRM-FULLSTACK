<template>
  <v-container>
    <v-fab
      class="me-4"
      icon="mdi-plus"
      location="bottom end"
      absolute
      app
      appear
      color="green"
      size="large"
      @click="dialog = true"
    />

    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="headline">Cadastrar Leads</span>
        </v-card-title>

        <v-card-text>
          <v-card class="elevation-4" style="padding: 16px">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="leadData.name"
                  label="Nome"
                  outlined
                  dense
                  hide-details
                />
              </v-col>

              <v-col>
                <v-text-field
                  v-model="leadData.email"
                  label="E-mail"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="leadData.phone"
                  label="Telefone"
                  outlined
                  dense
                  hide-details
                />
              </v-col>

              <v-col>
                <v-select
                  v-model="leadData.pipeline_phase_id"
                  :items="computedPipelinePhases"
                  item-title="name"
                  item-value="id"
                  label="Pipeline Phase"
                  :rules="[rules.requiredPipelinePhase]"
                  required
                  :loading="loadingPipelinePhases"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
            <v-card-actions style="display: flex; justify-content: end">
              <v-btn
                color="primary"
                style="
                  font-weight: bold;
                  color: white;
                  margin-right: 16px;
                  background-color: gainsboro;
                "
                @click="closeDialog"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="white"
                style="
                  font-weight: bold;
                  color: white;
                  margin-right: 16px;
                  background-color: green;
                "
                @click="createLead"
              >
                Criar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="js">
import { ref, computed, onMounted } from "vue";
import { useLeadsStore } from "@/store/leads";

const dialog = ref(false);
const leadData = ref({
  name: "",
  email: "",
  phone: "",
  pipeline_phase_id: "",
});

const leadsStore = useLeadsStore();
const loadingPipelinePhases = ref(true);

// Computed property para obter pipeline phases do store
const computedPipelinePhases = computed(() => leadsStore.pipelinePhases || []);

const rules = {
  requiredPipelinePhase: (value) => !!value || "Pipeline Phase é obrigatória.",
};

const closeDialog = () => {
  dialog.value = false;
  resetForm();
};

const resetForm = () => {
  leadData.value = {
    name: "",
    email: "",
    phone: "",
    pipeline_phase_id: "",
  };
};



onMounted(async () => {
  await leadsStore.fetchPipelinePhases();
  loadingPipelinePhases.value = false;
  console.log("Pipeline phases carregadas:", leadsStore.pipelinePhases);
});
</script>
