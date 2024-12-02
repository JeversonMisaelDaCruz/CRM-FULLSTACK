<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent>
        <v-divider />
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-view-kanban"
            title="Kanban"
            @click="navigateTo('Kanban')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Leads"
            @click="navigateTo('Leads')"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
    };
  },
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>
