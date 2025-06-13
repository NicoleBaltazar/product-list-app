// productStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("productStore", () => {
  const products = ref([]);

  const fetchProducts = async () => {
    const response = await fetch(`${API_BASE}/products`);
    products.value = await response.json();
  };

  return {
    products,
    fetchProducts,
  };
});
