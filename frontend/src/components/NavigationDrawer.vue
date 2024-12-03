<template>
  <v-navigation-drawer
    app
    clipped
    min-variant-expand-on-hover
    class="blur-effect"
    v-model="localDrawer"
  >
    <v-list>
      <template v-for="pipeline in pipelines" :key="pipeline.id">
        <v-list-item @click="selectPipeline(pipeline)">
          <div class="d-flex align-center justify-space-between w-100">
            <v-list-item-title>
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
</template>

<style scoped>
.blur-effect {
  background-color: rgba(184, 173, 144, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style>

<script>
import { useRouter } from "vue-router";

export default {
  props: {
    pipelines: {
      type: Array,
      required: true,
    },
    drawer: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:drawer", "select-pipeline", "confirm-delete"],
  computed: {
    localDrawer: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit("update:drawer", value);
      },
    },
  },
  setup() {
    const router = useRouter();

    const selectPipeline = (pipeline) => {
      router.push({ path: "/kanban", query: { pipelineId: pipeline.id } });
    };

    return {
      selectPipeline,
    };
  },
  methods: {
    confirmDelete(pipeline) {
      this.$emit("confirm-delete", pipeline);
    },
  },
};
</script>
