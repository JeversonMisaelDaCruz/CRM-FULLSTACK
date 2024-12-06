<template>
  <v-app-bar color="#B8AD90" prominent>
    <v-app-bar-nav-icon @click.stop="$emit('toggleDrawer')" />
    <v-toolbar-title v-if="selectedPipeline">
      {{ selectedPipeline.name }} | CRM
    </v-toolbar-title>
    <v-toolbar-title v-else-if="currentRoute === '/leads'">
      Leads | CRM
    </v-toolbar-title>
    <v-toolbar-title v-else>Home | CRM</v-toolbar-title>
    <v-spacer />
    <v-btn icon="mdi-logout" variant="text" @click="logout" />
  </v-app-bar>
</template>

<script>
import { useAuthStore } from "@/store/auth/User";
import { useRouter, useRoute } from "vue-router";

export default {
  props: {
    selectedPipeline: {
      type: Object,
      required: false,
      default: null,
    },
  },
  emits: ["toggleDrawer"],
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const currentRoute = route.path;

    const logout = () => {
      authStore.logout();
      router.push("/");
    };

    return {
      logout,
      currentRoute,
    };
  },
};
</script>
