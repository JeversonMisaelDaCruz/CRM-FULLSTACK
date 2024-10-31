<template>
  <v-app>
    <v-container>
      <h1 class="text-h4 mb-4">Gerenciar Leads</h1>
      <v-btn color="primary" @click="dialog = true">Novo Lead</v-btn>
      <modal v-model="dialog" @lead-saved="handleCreateLead" />

      <!-- Tabela de Leads com Botão de Exclusão -->
      <v-data-table :headers="headers" :items="leads" class="elevation-1 mt-4">
        <!-- Slot para a coluna de ações -->
        <template #item.actions="{ item }">
          <v-btn icon @click="handleDeleteLead(item.id)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
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
      headers: [
        { text: "Nome", value: "name" }, // Alinhado com o campo 'name'
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
      } catch (error) {
        console.error("Erro ao criar lead:", error);
      }
    },
    async handleDeleteLead(id) {
      try {
        await this.deleteLead(id);
      } catch (error) {
        console.error("Erro ao deletar lead:", error);
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
