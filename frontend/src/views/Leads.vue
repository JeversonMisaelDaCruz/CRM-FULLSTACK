<template>
  <v-app>
    <v-container>
      <h1 class="text-h4 mb-4">Gerenciar Leads</h1>
      <v-btn color="primary" @click="openModal()">Novo Lead</v-btn>
      <modal v-model="dialog" :leadToEdit="selectedLead" :statuses="statuses" @lead-saved="handleCreateLead"
        @lead-updated="handleUpdateLead" />
      <v-data-table :headers="headers" :items="leads" class="elevation-1 mt-4">
        <template #item.actions="{ item }">
          <v-btn icon @click="openModal(item)">
            <v-icon color="white">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="handleDeleteLead(item.id)">
            <v-icon color="white">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-snackbar v-model="snackbar" :timeout="3000" top right>
        {{ snackbarMessage }}
        <v-btn color="red" text @click="snackbar = false">Fechar</v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import modal from "@/components/modal.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Leads",
  components: {
    modal,
  },
  data() {
    return {
      dialog: false,
      selectedLead: null,
      snackbar: false,
      snackbarMessage: "",
      headers: [
        { text: "Nome", value: "name" },
        { text: "Email", value: "email" },
        { text: "Telefone", value: "phone" },
        { text: "Status", value: "status" },
        { text: "Ações", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState("leads", ["leads", "statuses"]),
  },
  methods: {
    ...mapActions("leads", ["fetchLeads", "fetchStatuses", "createLead", "updateLead", "deleteLead"]),
    openModal(lead = null) {
      this.selectedLead = lead;
      this.dialog = true;
    },
    async handleCreateLead(leadData) {
      try {
        await this.createLead(leadData);
        this.snackbarMessage = "Lead criado com sucesso!";
        this.snackbar = true;
      } catch (error) {
        console.error("Erro ao criar lead:", error);
      }
    },
    async handleUpdateLead(leadData) {
      try {
        await this.updateLead(leadData);
        this.snackbarMessage = "Lead atualizado com sucesso!";
        this.snackbar = true;
      } catch (error) {
        console.error("Erro ao atualizar lead:", error);
      }
    },
    async handleDeleteLead(id) {
      try {
        await this.deleteLead(id);
        this.snackbarMessage = "Lead deletado com sucesso!";
        this.snackbar = true;
      } catch (error) {
        console.error("Erro ao deletar lead:", error);
        this.snackbarMessage = "Erro ao deletar lead";
        this.snackbar = true;
      }
    },
  },
  async created() {
    await this.fetchLeads();
    await this.fetchStatuses(); // Carrega os statuses
  },
};
</script>
