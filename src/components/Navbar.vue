<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!-- <div class="container-fluid">
      <a class="navbar-brand" href="#">Rkived</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">
      </div>
    </div> -->
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
