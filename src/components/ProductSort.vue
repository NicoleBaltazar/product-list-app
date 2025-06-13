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
