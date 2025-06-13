// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import ProductPage from "../pages/ProductPage.vue";
import FavoritesPage from "../pages/FavoritesPage.vue";
import CartPage from "../pages/CartPage.vue";

const routes = [
  { path: "/", component: ProductPage },
  { path: "/favorites", component: FavoritesPage },
  { path: "/cart", component: CartPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
