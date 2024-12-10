<template>
  <div>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
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

    <v-navigation-drawer
      app
      clipped
      min-variant-expand-on-hover
      class="blur-effect"
      color="primary"
      v-model="drawer"
    >
      <v-list>
        <v-list-item>
          <v-list-item-title
            class="text-h6"
            style="font-weight: bold; color: black"
          >
            Pipelines
          </v-list-item-title>
        </v-list-item>
        <v-divider class="mb-2" />

        <template v-for="pipeline in pipelines || []" :key="pipeline.id">
          <v-list-item @click="selectPipeline(pipeline)">
            <div class="d-flex align-center justify-space-between w-100">
              <v-list-item-title style="color: black">
                {{ pipeline?.name ? pipeline.name.toUpperCase() : "" }}
              </v-list-item-title>
              <v-btn
                icon
                @click.stop="confirmDelete(pipeline)"
                style="background-color: white"
                class="blur-effect"
              >
                <v-icon color="black">mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-list-item>
          <v-divider class="my-2" />
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import router from "@/router";
import { usePipelineStore } from "@/store/pipeline";

const pipelineStore = usePipelineStore();

const pipelines = computed(() => pipelineStore.pipeline);

const selectPipeline = ({ id }) => {
  router.push({ path: "/kanban", query: { pipelineId: id } });
};
</script>

<script>
import { useAuthStore } from "@/store/auth/User";
import { useRouter, useRoute } from "vue-router";

export default {
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
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
