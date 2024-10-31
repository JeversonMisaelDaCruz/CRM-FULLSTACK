<template>
  <v-app>
    <v-container>
      <h1 class="text-h4 mb-4">Gerenciar Leads</h1>
      <v-btn color="primary" @click="dialog = true">Novo Lead</v-btn>
      <modal v-model="dialog" @lead-saved="handleCreateLead" />
      <v-data-table :headers="headers" :items="leads" class="elevation-1 mt-4">
        <template #item.actions="{ item }">
          <v-btn icon @click="handleDeleteLead(item.id)">
            <v-icon color="white">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <v-snackbar v-model="snackbar" :timeout="3000" top right>
        {{ snackbarMessage }}
        <v-btn color="red" text @click="snackbar = false">
          Fechar
        </v-btn>
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
      snackbar: false,
      snackbarMessage: '',
      dialog: false,
      headers: [
        { text: "Nome", value: "name" },
        { text: "Email", value: "email" },
        { text: "Telefone", value: "phone" },
        { text: "Ações", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState("leads", ["leads"]),
  },
  methods: {
    ...mapActions("leads", ["fetchLeads", "createLead", "deleteLead"]),

    async handleCreateLead(leadData) {
      try {
        await this.createLead(leadData);
        this.snackbarMessage = "Lead criado com sucesso!";
        this.snackbar = true;
        console.log("Lead criado com sucesso:", leadData);
      } catch (error) {
        console.error("Erro ao criar lead:", error);
      }
    },
    async handleDeleteLead(id) {
      try {
        await this.deleteLead(id);
        this.snackbarMessage = "Lead deletado com sucesso!";
        this.snackbar = true;
        console.log("Lead deletado com sucesso:", id);
      } catch (error) {
        console.error("Erro ao deletar lead:", error);
        this.snackbarMessage = "Erro ao deletar lead";
        this.snackbar = true;
      }
    },
  },
  created() {
    this.fetchLeads();
  },
};
</script>

<style scoped>
.text-h4 {
  font-weight: bold;
}
</style>
