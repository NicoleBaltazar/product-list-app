<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <div class="container-fluid">
      <!-- Left: Brand -->
      <router-link to="/" class="navbar-brand fw-bold"> 📚 Rkived</router-link>

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
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="isAdmin">
          <router-link to="/admin" class="btn btn-outline-light me-2">
            🛠 Admin Dashboard</router-link
          >
          <button @click="logout" class="btn btn-outline-danger btn-sm">
            Logout
          </button>
        </ul>
        <ul
          class="navbar-nav ms-auto mb-2 mb-lg-0"
          v-if="!isAdmin && userStore.user && !isLoginPage"
        >
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

        <!-- If not logged in or on login page -->
        <ul
          class="navbar-nav ms-auto"
          v-else-if="isLoginPage || !userStore.user"
        >
          <li class="nav-item">
            <router-link
              to="/login"
              class="nav-link border border-success px-3 py-1 rounded login-btn"
              style="font-weight: 600"
            >
              Login
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore"; // adjust path if needed
import { computed } from "vue";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// Check if current route is the login page
const isLoginPage = computed(() => route.path === "/login");
const isAdmin = computed(() => userStore.user?.role === "admin");

const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>
<style>
.login-btn {
  background-color: white;
  transition: all 0.3s ease;
  color: #198754;
}

.login-btn:hover {
  background-color: #198754; /* Bootstrap 'success' color */
  color: white;
  text-decoration: none;
}
</style>
