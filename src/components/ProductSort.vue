<template>
  <!-- Sorting dropdown -->
  <div class="mb-4 d-flex justify-content-end">
    <select class="form-select w-auto" v-model="productStore.sortOrder">
      <option value="none">Sort by Price</option>
      <option value="asc">Lowest to Highest</option>
      <option value="desc">Highest to Lowest</option>
    </select>
  </div>
</template>

<script setup>
import { useProductStore } from "../stores/productStore";

const productStore = useProductStore();
</script>

<style scoped>
.custom-select-green {
  border: 2px solid #28a745;
  color: #28a745;
}
.custom-select-green:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}
</style>
