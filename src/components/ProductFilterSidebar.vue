<template>
  <div class="p-3 border rounded shadow-sm filter-box">
    <H5 class="mb-4 text-uppercase text-success fw-bold border-bottom pb-2">
      Filters
    </H5>
    <!-- Price Range -->
    <div class="mt-3">
      <label class="form-label fw-bold">Price Range</label>
      <div class="input-group mb-2">
        <span class="input-group-text bg-light text-success border-success"
          >$</span
        >
        <input
          type="number"
          class="form-control border-success"
          placeholder="Min"
          :value="productStore.minPrice ?? ''"
          @input="onMinInput"
        />
      </div>
      <div class="input-group">
        <span class="input-group-text bg-light text-success border-success"
          >$</span
        >
        <input
          type="number"
          class="form-control border-success"
          placeholder="Max"
          :value="productStore.maxPrice ?? ''"
          @input="onMaxInput"
        />
      </div>
    </div>

    <!-- Category Filter -->
    <div class="mt-4">
      <label class="form-label fw-bold">Categories</label>
      <div
        class="form-check"
        v-for="category in productStore.categories"
        :key="category.id"
      >
        <input
          class="form-check-input"
          type="checkbox"
          :id="'cat-' + category.id"
          :value="category.id"
          v-model="productStore.selectedCategoryIds"
        />
        <label class="form-check-label" :for="'cat-' + category.id">
          {{ category.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "../stores/productStore";
const productStore = useProductStore();

const onMinInput = (e) => {
  const val = e.target.value;
  productStore.minPrice = val === "" ? null : Number(val);
};

const onMaxInput = (e) => {
  const val = e.target.value;
  productStore.maxPrice = val === "" ? null : Number(val);
};
</script>

<style scoped>
.filter-box {
  border: 2px solid #28a745;
  background-color: #f9fdf9;
}

.filter-title {
  color: #28a745;
  font-weight: bold;
}

.form-control:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}
</style>
