import leads from "@/store/leads";
import Leads from "../views/Leads.vue";
import Login from "@/views/Login.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/leads",
    name: leads,
    component: Leads,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
