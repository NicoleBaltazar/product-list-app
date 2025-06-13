<!-- components/CategorySidebar.vue -->
<template>
  <div class="list-group">
    <button
      class="list-group-item list-group-item-action"
      :class="{ active: productStore.selectedCategoryId === null }"
      @click="productStore.setCategory(null)"
    >
      All Categories
    </button>

    <button
      v-for="category in productStore.categories"
      :key="category.id"
      class="list-group-item list-group-item-action"
      :class="{ active: productStore.selectedCategoryId === category.id }"
      @click="productStore.setCategory(category.id)"
    >
      {{ category.name }}
      <!-- <img
        :src="category.image"
        class="card-img-top object-fit-cover"
        alt="Product Image"
        style="height: 200px"
      /> -->
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
</script>
