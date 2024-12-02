<template>
  <v-container>
    <v-fab
      class="me-4"
      icon="mdi-plus"
      location="bottom end"
      absolute
      app
      appear
      color="#B8AD90"
      size="large"
      @click="dialog = true"
    />

    <v-dialog v-model="dialog" max-width="900" color="#B8AD90">
      <v-card>
        <v-card-title
          style="background-color: #b8ad90"
          class="d-flex justify-space-between align-center"
        >
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
                color="white"
                style="
                  font-weight: bold;
                  color: white;
                  margin-right: 16px;
                  background-color: red;
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
                  background-color: #b8ad90;
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

const computedPipelinePhases = computed(() => leadsStore.PipelinePhase || []);

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

const createLead = async () => {
  try {
    await leadsStore.createLead(leadData.value);
    closeDialog();
  } catch (error) {
    console.error("Erro ao criar lead:", error);
    alert("Erro ao criar lead: Verifique os dados preenchidos.");
  }
};

onMounted(async () => {
  await leadsStore.fetchPipelinePhases();
  loadingPipelinePhases.value = false;
});
</script>
