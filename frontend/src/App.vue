<template>
  <v-app>
    <Header v-if="user" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from "./store/auth/User";
import Header from "./components/Header.vue";
import { computed, onMounted } from "vue";

const authStore = useAuthStore();

const user = computed(() => authStore.user);

onMounted(() => {
  authStore.fetchUserProfile();
});
</script>
