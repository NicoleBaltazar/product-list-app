<template>
  <div class="p-3 border rounded shadow-sm">
    <h5>Filters</h5>

    <!-- Price Range -->
    <div class="mt-3">
      <label class="form-label">Price Range</label>
      <div class="input-group mb-2">
        <span class="input-group-text">$</span>
        <input
          type="number"
          class="form-control"
          placeholder="Min"
          :value="productStore.minPrice ?? ''"
          @input="onMinInput"
        />
      </div>
      <div class="input-group">
        <span class="input-group-text">$</span>
        <input
          type="number"
          class="form-control"
          placeholder="Max"
          :value="productStore.maxPrice ?? ''"
          @input="onMaxInput"
        />
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
