// productStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { API_BASE } from "../config";

export const useProductStore = defineStore("productStore", () => {
  const products = ref([]); //list of all products
  const searchTerm = ref(""); //keywords for search

  const fetchProducts = async () => {
    const response = await fetch(`${API_BASE}/products`);
    products.value = await response.json();
  };

  const filteredProducts = computed(() => {
    return products.value.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });

  return {
    products,
    fetchProducts,
    searchTerm,
    filteredProducts,
  };
});
