<template>
  <v-row>
    <v-col>
      <v-btn v-if="!selectedPipeline" @click="onClick" color="primary">
        Criar Pipeline
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    selectedPipeline: {
      type: Object,
      required: false,
    },
  },
  emits: ["create-pipeline"],
  methods: {
    onClick() {
      this.$emit("create-pipeline");
    },
  },
};
</script>

<style scoped></style>
