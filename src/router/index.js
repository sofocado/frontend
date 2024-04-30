import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/login",
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
        path: "/menuUploadView",
        name: "MenuUpload",
        component: () => import("../views/MenuUploadView.vue"),
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;








// import { createRouter, createWebHistory } from "vue-router";
// import LoginView from "../views/settings/LoginView.vue";

// const routes = [
//   {
//     path: "/login",
//     name: "Login",
//     component: LoginView,
//   },
//   {
//     path: "/admin",
//     name: "Admin",
//     component: () => import("../views/AdminView.vue"),
//     children: [
//       {
//         path: "/admin/profile",
//         name: "ProfileView",
//         component: () => import("../views/ProfileView.vue"),
//       },
//       {
//         path: "/admin/menu/list",
//         name: "MenuList",
//         component: () => import("../views/MenuList.vue"),
//       },
//       {
//         path: "/admin/reservations",
//         name: "Reservations",
//         component: () => import("../views/ReservationsView.vue"),
//         children: [
//           {
//             path: "/preorder",
//             name: "Pre-Order",
//             component: () => import("../views/PreOrderView.vue"),
//           },
//         ]
//       },
//       {
//         path: "/admin/table",
//         name: "TableView",
//         component: () => import("../views/TableView.vue"),
//       },
//       {
//         path: "/admin/menuUploadView",
//         name: "MenuUpload",
//         component: () => import("../views/MenuUploadView.vue"),
//       },
//       {
//         path: "/admin/order",
//         name: "ReviewsList",
//         component: () => import("../views/ReviewsList.vue"),
//       },
//     ],
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

// export default router;