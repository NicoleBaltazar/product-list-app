// productStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { API_BASE } from "../config";

export const useProductStore = defineStore("productStore", () => {
  const products = ref([]); //list of all products
  const searchTerm = ref(""); //keywords for search
  const selectedCategoryId = ref(null); //selected category by the user
  const categories = ref([]); // list of categories

  //for other filtering
  const sortOrder = ref("none"); // 'asc' or 'desc'

  const fetchProducts = async () => {
    const response = await fetch(`${API_BASE}/products`);
    products.value = await response.json();
  };

  const fetchCategories = async () => {
    const response = await fetch(`${API_BASE}/categories`);
    categories.value = await response.json();
  };

  const setCategory = (id) => {
    selectedCategoryId.value = id;
  };

  const setSortOrder = (order) => {
    sortOrder.value = order;
  };

  const filteredProducts = computed(() => {
    let result = products.value;

    // Filter#1: filter by word search
    if (searchTerm.value) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    }

    // Filter#2: filter by selected category
    if (selectedCategoryId.value !== null) {
      result = result.filter(
        (product) => product.category.id === selectedCategoryId.value
      );
    }

    // Sort
    if (sortOrder.value === "asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder.value === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  });

  //   const filteredProducts = computed(() => {
  //     return products.value
  //       .filter(
  //         (
  //           product //filter#1: filter by word search
  //         ) =>
  //           product.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  //       )
  //       .filter((product) => {
  //         //filter#2 filter by selected category
  //         if (!selectedCategoryId.value) return true;
  //         return product.category.id === selectedCategoryId.value;
  //       });
  //   });

  return {
    products,
    searchTerm,
    selectedCategoryId,
    categories,
    sortOrder,
    fetchProducts,
    fetchCategories,
    setCategory,

    setSortOrder,
    filteredProducts,
  };
});
