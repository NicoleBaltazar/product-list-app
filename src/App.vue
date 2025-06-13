<!-- <template>
  <div>
    <Navbar />
    <div class="container-fluid mx-2">
      <h1 class="text-center my-5">Product CRUD App</h1>

      <div class="row">
        <div class="col-md-2">
          <CategorySidebar />
        </div>

        <div class="col-md-8">
          <ProductSort />
          <ProductList />
        </div>

        <div class="col-md-2 mb-4">
          <ProductFilterSidebar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import ProductList from "./components/ProductList.vue";
import CategorySidebar from "./components/CategorySidebar.vue";
import ProductSort from "./components/ProductSort.vue";
import ProductFilterSidebar from "./components/ProductFilterSidebar.vue";
</script>

 -->
<!-- For many pages -->
<template>
  <!-- Navbar will remain in all pages -->
  <Navbar />
  <router-view />
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>
