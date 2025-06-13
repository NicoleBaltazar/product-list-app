<template>
  <div>
    <h2>Product List</h2>

    <input
      v-model="productStore.searchTerm"
      type="text"
      placeholder="Search products..."
      class="search-box"
    />

    <div class="product-grid">
      <div
        v-for="product in productStore.filteredProducts"
        :key="product.id"
        class="product-card"
      >
        <img :src="product.images[0]" alt="product image" />
        <h3>{{ product.title }}</h3>
        <p>\${{ product.price }}</p>
        <p class="category">{{ product.category.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "../stores/productStore";

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  background: #f9f9f9;
}

.product-card img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.category {
  font-size: 0.9rem;
  color: #666;
}
</style>
