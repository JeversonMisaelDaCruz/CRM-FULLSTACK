import Kanban from "@/views/kanban.vue";
import Leads from "@/views/Leads.vue";
import Login from "@/views/Login.vue";
import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";

const manualRoutes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/leads",
    component: Leads,
  },
  {
    path: "/kanban",
    component: Kanban,
  },
];

const routes = setupLayouts([...manualRoutes]);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
