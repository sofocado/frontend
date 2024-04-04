import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";


const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/AdminView.vue"),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/DashboardView.vue"),
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("../views/ProfileView.vue"),
      },
      {
        path: "/reservations",
        name: "Reservations",
        component: () => import("../views/ReservationsView.vue"),
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: () => import("../views/NotifView.vue"),
      },
      {
        path: "/update",
        name: "UpdatePage",
        component: () => import("../views/UpdateProfileView.vue"),
      },
      {
        path: "chat",
        name: "Chat",
        component: () => import("../views/ChatView.vue"),
      },
      {
        path: "menu",
        name: "MenuUpload",
        component: () => import("../views/MenuUploadView.vue"),
      },
      {
        path: "menuList",
        name: "MenuList",
        component: () => import("../views/MenuView.vue"),
      },
      {
        path: "preorder",
        name: "Pre-Order",
        component: () => import("../views/PreOrderView.vue"),
      },
    ],
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
