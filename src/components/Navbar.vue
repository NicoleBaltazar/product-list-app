<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Rkived</router-link>

    <div class="ms-auto d-flex gap-3">
      <router-link to="/favorites" class="btn btn-outline-light">
        <i class="bi bi-heart-fill me-1"></i> Favorites
      </router-link>

      <router-link to="/cart" class="btn btn-outline-light">
        <i class="bi bi-cart-fill me-1"></i> Cart
      </router-link>
    </div>
  </nav>
</template>

<script setup>
// No logic needed for now
</script>
