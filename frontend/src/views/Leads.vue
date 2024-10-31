<template>
  <v-app>
    <v-container>
      <h1 class="text-h4 mb-4">Gerenciar Leads</h1>
      <v-btn color="primary" @click="dialog = true">Novo Lead</v-btn>
      <modal v-model="dialog" @lead-saved="handleCreateLead" />
      <v-data-table :headers="headers" :items="leads" class="elevation-1 mt-4">
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
        { text: "Nome", value: "name" },
        { text: "Email", value: "email" },
        { text: "Telefone", value: "phone" },
      ],
    };
  },
  computed: {
    ...mapState("leads", ["leads"]),
  },
  methods: {
    ...mapActions("leads", ["fetchLeads", "createLead"]),
    async handleCreateLead(leadData) {
      try {
        await this.createLead(leadData);
      } catch (error) {
        console.error("Erro ao criar lead:", error);

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
