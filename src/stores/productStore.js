// productStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { API_BASE } from "../config";

export const useProductStore = defineStore("productStore", () => {
  const products = ref([]); //list of all products
  const searchTerm = ref(""); //keywords for search
  const selectedCategoryId = ref(null); //selected category by the user
  const categories = ref([]); // list of categories

  //   for other filtering
  const sortOrder = ref("none"); // 'asc' or 'desc'
  const minPrice = ref(null);
  const maxPrice = ref(null);

  //   on each product cards
  const favorites = ref([]);
  const cart = ref([]);

  const fetchProducts = async () => {
    const response = await fetch(`${API_BASE}/products`);
    products.value = await response.json();
  };

  const fetchCategories = async () => {
    const response = await fetch(`${API_BASE}/categories`);
    categories.value = await response.json();
  };

  //CREATE
  const createProduct = async (newProduct) => {
    const res = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      throw new Error("Failed to create product");
    }

    const createdProduct = await res.json();
    products.value.unshift(createdProduct); // Add to top of the list
  };

  //DELETE
  const deleteProduct = async (id) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete product");
    }

    // Remove from local list
    products.value = products.value.filter((p) => p.id !== id);
  };

  const setCategory = (id) => {
    selectedCategoryId.value = id;
  };

  const setSortOrder = (order) => {
    sortOrder.value = order;
  };

  //   Filtering features
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
    //Filter#3: filter by price range
    if (minPrice.value !== null && minPrice.value !== "") {
      result = result.filter((product) => product.price >= minPrice.value);
    }
    if (maxPrice.value !== null && maxPrice.value !== "") {
      result = result.filter((product) => product.price <= maxPrice.value);
    }

    // Sort
    if (sortOrder.value === "asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder.value === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  });
  // Add to Favorites
  const addToFavorites = (product) => {
    const exists = favorites.value.some((p) => p.id === product.id);
    if (!exists) {
      favorites.value = [...favorites.value, product]; // force reactivity
    }
  };
  //  Add to Cart
  const addToCart = (product) => {
    const exists = cart.value.some((p) => p.id === product.id);
    if (!exists) {
      cart.value = [...cart.value, product]; // force reactivity
    }
  };

  // Remove from favorites
  const removeFromFavorites = (productId) => {
    favorites.value = favorites.value.filter((p) => p.id !== productId);
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    cart.value = cart.value.filter((p) => p.id !== productId);
  };
  return {
    products,
    searchTerm,
    selectedCategoryId,
    categories,
    sortOrder,
    minPrice,
    maxPrice,
    favorites,
    cart,
    filteredProducts,
    fetchProducts,
    fetchCategories,
    setCategory,
    setSortOrder,
    addToFavorites,
    addToCart,
    removeFromFavorites,
    removeFromCart,
    createProduct,
    deleteProduct,
  };
});
