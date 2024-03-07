import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardView.vue"),
  },
  {
    path: "/admin/profile",
    name: "Profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/admin/profile/update",
    name: "ProfileUpdate",
    component: () => import("../views/ProfileUpdate.vue"),
  },

  {
    path: "/admin/list",
    name: "RestaurantList",
    component: () => import("../views/RestaurantList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
