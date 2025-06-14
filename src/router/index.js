// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import ProductPage from "../pages/ProductPage.vue";
import FavoritesPage from "../pages/FavoritesPage.vue";
import CartPage from "../pages/CartPage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import { useUserStore } from "@/stores/userStore";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginPage },

  {
    path: "/admin",
    name: "AdminPage",
    component: AdminPage,
    meta: { requiresAuth: true, adminOnly: true },
  },

  { path: "/products", component: ProductPage },
  { path: "/favorites", component: FavoritesPage },
  { path: "/cart", component: CartPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.user) {
    return next("/login");
  }

  if (to.meta.adminOnly && userStore.user?.role !== "admin") {
    return next("/");
  }

  next();
});

export default router;
