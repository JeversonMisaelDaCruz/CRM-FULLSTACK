import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth/User";

// Páginas
import Login from "@/views/Login.vue";
import Kanban from "@/views/Kanban.vue";
import Leads from "@/views/Leads.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/kanban",
    name: "Kanban",
    component: Kanban,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/leads",
    name: "Leads",
    component: Leads,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.token) {
    console.warn("Usuário não autenticado. Redirecionando para login...");
    return next({ name: "Login" });
  }

  next();
});

export default router;
