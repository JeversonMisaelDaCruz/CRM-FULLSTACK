<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        color="primary"
      >
        <v-divider />
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home"
            title="Dashboard"
            @click="navigateTo('Kanban')"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi-account-multiple-outline"
            title="Leads"
            @click="navigateTo('Leads')"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view :key="routeKey" />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { useKanbanStore } from "@/store/kanban";

export default {
  data() {
    return {
      drawer: true,
      rail: true,
      routeKey: 0,
    };
  },
  methods: {
    navigateTo(routeName) {
      if (routeName === "Kanban") {
        this.resetKanbanState();
      }
      this.routeKey++;
      this.$router.push({ name: routeName });
    },
    resetKanbanState() {
      const kanbanStore = useKanbanStore();
      kanbanStore.$reset();
    },
  },
};
</script>
