<template>
  <div class="list-group">
    <h3 class="mb-4 text-uppercase fw-bold text-success border-bottom pb-2">
      Categories
    </h3>
    <button
      class="list-group-item list-group-item-action p-3 px-4"
      :class="{ active: productStore.selectedCategoryId === null }"
      @click="productStore.setCategory(null)"
    >
      All Categories
    </button>

    <button
      v-for="category in productStore.categories"
      :key="category.id"
      class="list-group-item list-group-item-action p-3 px-4"
      :class="{ active: productStore.selectedCategoryId === category.id }"
      @click="productStore.setCategory(category.id)"
    >
      <i :class="getCategoryIcon(category.name)" class="me-2"></i>
      {{ category.name }}
    </button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "../stores/productStore";

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchCategories();
});

// Simple icon mapping — adjust category names or add more as needed
const getCategoryIcon = (categoryName) => {
  const map = {
    Clothes: "fas fa-tshirt",
    Electronics: "fas fa-plug",
    Furniture: "fas fa-couch",
    Shoes: "fas fa-shoe-prints",
    Others: "fas fa-ellipsis-h",
  };
  return map[categoryName] || "fas fa-tag"; // fallback icon
};
</script>

<style scoped>
.list-group-item.active {
  background-color: #28a745; /* Bootstrap green */
  border-color: #28a745;
  color: white;
}
</style>
