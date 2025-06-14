<template>
  <div class="container-fluid my-5">
    <div class="row">
      <div class="col-md-2">
        <CategorySidebar />
      </div>

      <div class="col-md-8">
        <ProductSort />
        <AdminDashboard />
      </div>

      <div class="col-md-2 mb-4">
        <ProductFilterSidebar />
      </div>
    </div>
  </div>
</template>

<script setup>
import CategorySidebar from "@/components/CategorySidebar.vue";
import ProductSort from "@/components/ProductSort.vue";
import AdminDashboard from "@/components/AdminDashboard.vue";
import ProductFilterSidebar from "@/components/ProductFilterSidebar.vue";
</script>

<style>
.container {
  /* background-color: #6b705c;  */
}
</style>
