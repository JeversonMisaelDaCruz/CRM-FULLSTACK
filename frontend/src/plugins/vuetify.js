/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#6366F1",
          "primary-darken-1": "#4F46E5",
          secondary: "#F59E0B",
          "secondary-darken-1": "#D97706",
          background: "#F9FAFB",
          surface: "#FFFFFF",
          "surface-variant": "#F3F4F6",
          error: "#EF4444",
          success: "#10B981",
          warning: "#F59E0B",
          info: "#3B82F6",
        },
      },
      dark: {
        colors: {
          primary: "#818CF8",
          "primary-darken-1": "#6366F1",
          secondary: "#FCD34D",
          "secondary-darken-1": "#F59E0B",
          background: "#111827",
          surface: "#1F2937",
          "surface-variant": "#374151",
          error: "#F87171",
          success: "#34D399",
          warning: "#FCD34D",
          info: "#60A5FA",
        },
      },
    },
  },
});
