import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";


const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardView.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/AdminView.vue"),
    children: [
      {
        path: "/statistic",
        name: "Statistic",
        component: () => import("../views/StatisticsView.vue"),
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
        path: "/updateProfile",
        name: "UpdateProfilePage",
        component: () => import("../views/UpdateProfileView.vue"),
      },
      {
        path: "/menuList",
        name: "MenuList",
        component: () => import("../views/MenuView.vue"),
      },
      {
        path: "/tables",
        name: "Tables",
        component: () => import("../views/TablesView.vue"),
      },
      {
        path: "/banner",
        name: "Banner",
        component: () => import("../views/BannerList.vue"),
      },
      {
        path: "/bannerAdd",
        name: "BannerAdd",
        component: () => import("../views/BannerAdd.vue"),
      },
      {
        path: "/categoryAdd",
        name: "CategoryAdd",
        component: () => import("../views/CategoryAdd.vue"),
      },
      {
        path: "/menuCatAdd",
        name: "MenuCatAdd",
        component: () => import("../views/MenuCatAdd.vue"),
      },
      {
        path: "/orders",
        name: "Order",
        component: () => import("../views/OrderView.vue"),
      },
      {
        path: "/reviews",
        name: "ReviewsList",
        component: () => import("../views/ReviewsList.vue"),
      },
     
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;