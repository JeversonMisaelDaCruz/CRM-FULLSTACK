<template>
  <v-btn
    icon
    @click="toggleTheme"
    :aria-label="isDark ? 'Modo claro' : 'Modo escuro'"
  >
    <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
  </v-btn>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();

const isDark = computed(() => theme.global.name.value === 'dark');

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark';
  localStorage.setItem('theme', theme.global.name.value);
};

// Carregar tema salvo ao montar
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.global.name.value = savedTheme;
  }
});
</script>
