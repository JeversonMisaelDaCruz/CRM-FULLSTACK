import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth/User";

import Login from "@/views/Login.vue";
import Kanban from "@/views/Kanban.vue";
import Leads from "@/views/Leads.vue";
import MainLayout from "@/components/MainLayout.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "kanban",
        name: "Kanban",
        component: Kanban,
      },
      {
        path: "leads",
        name: "Leads",
        component: Leads,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Proteção de rotas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.token) {
    console.warn("Usuário não autenticado. Redirecionando para login...");
    return next({ name: "Login" });
  }

  next();
});

export default router;
