<template>
  <div class="container-fluid mx-2">
    <h1 class="text-center my-5">Product CRUD App</h1>

    <div class="row">
      <!-- Sidebar -->
      <div class="col-md-2">
        <CategorySidebar />
      </div>

      <!-- Main -->
      <div class="col-md-9">
        <ProductFilters />
        <ProductList />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductList from "./components/ProductList.vue";
import CategorySidebar from "./components/CategorySidebar.vue";
import ProductFilters from "./components/ProductFilters.vue";
</script>

<style scoped>
/* h1 {
  text-align: center;
  margin-top: 2rem;
} */
</style>
