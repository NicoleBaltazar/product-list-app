<template>
  <div class="container my-5">
    <h2 class="mb-4 text-center text-uppercase fw-bold border-bottom pb-2">
      RKIVED Product List
    </h2>

    <!-- Search Input -->
    <div class="mb-4">
      <input
        v-model="productStore.searchTerm"
        type="text"
        class="form-control form-control-lg"
        placeholder="🔍 Search products here..."
      />
    </div>

    <!-- Product Grid -->
    <!-- List the products -->
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        v-for="product in paginatedProducts"
        :key="product.id"
      >
        <!-- Product cards -->
        <div
          class="card h-100 shadow-sm p-3"
          style="background-color: #ffffff; color: #333333"
        >
          <img
            :src="product.images[0]"
            class="card-img-top object-fit-cover"
            alt="Product Image"
            style="height: 200px"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text mb-1" style="color: #ff6f61">
              ${{ product.price }}
            </p>
            <span
              class="badge p-2"
              style="background-color: #28a745; color: #ffffff"
            >
              {{ product.category.name }}
            </span>
          </div>
          <div v-if="!isAdmin" class="mt-auto d-flex justify-content-between">
            <button
              class="btn btn-outline-danger btn-sm"
              @click="
                productStore.addToFavorites(product);
                showToast('Added to Favorites!');
              "
            >
              ❤️ Favorite
            </button>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="
                productStore.addToCart(product);
                showToast('Added to Cart!');
              "
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Centered Toast Notification -->
    <div
      v-if="toastMessage"
      class="position-fixed top-50 start-50 translate-middle bg-dark text-white px-4 py-3 rounded shadow"
      style="z-index: 1055; min-width: 300px; text-align: center"
    >
      {{ toastMessage }}
    </div>

    <!-- Pagination -->
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-change="goToPage"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../stores/productStore";
import { useUserStore } from "@/stores/userStore"; // adjust path if needed
import Pagination from "@/components/Pagination.vue";

const productStore = useProductStore();
const userStore = useUserStore();

const currentPage = ref(1);
const itemsPerPage = 20;

const isAdmin = computed(() => userStore.user?.role === "admin");
const toastMessage = ref("");

const showToast = (message) => {
  toastMessage.value = message;
  setTimeout(() => {
    toastMessage.value = "";
  }, 2000);
};

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

<style scoped>
.page-item.active .page-link {
  background-color: #28a745;
  border-color: white;
  color: white;
}

.page-link {
  cursor: pointer;
}
</style>
