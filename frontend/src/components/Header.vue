<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon @click.stop="$emit('toggleDrawer')" />
    <v-toolbar-title v-if="selectedPipeline">
      CRM | {{ selectedPipeline.name }}
    </v-toolbar-title>
    <v-toolbar-title v-else>CRM |</v-toolbar-title>
    <v-spacer />
    <v-btn icon="mdi-logout" variant="text" @click="logout" />
  </v-app-bar>
</template>

<script>
import { useAuthStore } from "@/store/auth/User";
import { useRouter } from "vue-router";

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

    const logout = () => {
      authStore.logout();
      router.push("/");
    };

    return {
      logout,
    };
  },
};
</script>
