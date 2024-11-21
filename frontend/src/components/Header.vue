<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon @click.stop="toggleDrawer" />
    <!-- Título exibindo o nome da pipeline selecionada -->
    <v-toolbar-title v-if="selectedPipeline">
      CRM | {{ selectedPipeline.name }}
    </v-toolbar-title>
    <!-- Título padrão caso nenhuma pipeline esteja selecionada -->
    <v-toolbar-title v-else>CRM |</v-toolbar-title>
    <v-spacer />
    <v-btn icon="mdi-dots-vertical" variant="text" />
  </v-app-bar>
</template>

<script>
export default {
  props: {
    selectedPipeline: {
      type: Object,
      required: false,
      default: null,
    },
  },
  emits: ["toggleDrawer"],
  methods: {
    toggleDrawer() {
      this.$emit("toggleDrawer");
    },
  },
};
</script>