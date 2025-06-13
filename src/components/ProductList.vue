<template>
  <div class="container my-5">
    <h2 class="mb-4 text-center">Product List</h2>

    <!-- Search Input -->
    <div class="mb-4">
      <input
        v-model="productStore.searchTerm"
        type="text"
        class="form-control form-control-lg"
        placeholder="🔍 Search products here..."
      />
      <p>Favorites count: {{ productStore.favorites.length }}</p>
      <p>Cart count: {{ productStore.cart.length }}</p>
    </div>

    <!-- Product Grid -->
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        v-for="product in paginatedProducts"
        :key="product.id"
      >
        <!-- Product cards -->
        <div class="card h-100 shadow-sm">
          <img
            :src="product.images[1]"
            class="card-img-top object-fit-cover"
            alt="Product Image"
            style="height: 200px"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text text-muted mb-1">\${{ product.price }}</p>
            <span class="badge bg-secondary">{{ product.category.name }}</span>
          </div>
          <div v-if="!isAdmin" class="mt-auto d-flex justify-content-between">
            <button
              class="btn btn-outline-danger btn-sm"
              @click="productStore.addToFavorites(product)"
            >
              ❤️ Favorite
            </button>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="productStore.addToCart(product)"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav class="d-flex justify-content-center mt-4">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
          @click="goToPage(currentPage - 1)"
        >
          <button class="page-link">Previous</button>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          <button class="page-link">{{ page }}</button>
        </li>
        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
          @click="goToPage(currentPage + 1)"
        >
          <button class="page-link">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../stores/productStore";
import { useUserStore } from "@/stores/userStore"; // adjust path if needed

const productStore = useProductStore();
const userStore = useUserStore();

const currentPage = ref(1);
const itemsPerPage = 20;

const isAdmin = computed(() => userStore.user?.role === "admin");

// Compute the products for the current page | should be 24
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return productStore.filteredProducts.slice(start, end);
});

// Total pages for pagination
const totalPages = computed(() => {
  return Math.ceil(productStore.filteredProducts.length / itemsPerPage);
});

// Change page
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(() => {
  productStore.fetchProducts();
});
</script>
<!-- 
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
</style> -->
