// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import ProductList from "../components/ProductList.vue";
import CategorySidebar from "./components/CategorySidebar.vue";
import ProductSort from "./components/ProductSort.vue";
import ProductFilterSidebar from "./components/ProductFilterSidebar.vue";
import FavoritesPage from "../pages/FavoritesPage.vue";
// import CartPage from "../pages/CartPage.vue";

const routes = [
  { path: "/", component: ProductList },
  { path: "/favorites", component: FavoritesPage },
  //   { path: "/cart", component: CartPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
