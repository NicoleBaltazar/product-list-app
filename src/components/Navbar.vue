<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
    <div class="container-fluid">
      <!-- Left: Brand -->
      <router-link to="/" class="navbar-brand fw-bold">Rkived</router-link>

      <!-- Toggler for mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Right: Navigation links -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item me-3">
            <router-link to="/favorites" class="nav-link">
              ❤️ Favorites
            </router-link>
          </li>
          <li class="nav-item me-3">
            <router-link to="/cart" class="nav-link"> 🛒 Cart </router-link>
          </li>
          <li class="nav-item mt-1">
            <button @click="logout" class="btn btn-outline-danger btn-sm">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore"; // adjust path if needed

const router = useRouter();
const userStore = useUserStore();

const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>
