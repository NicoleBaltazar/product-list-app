<template>
  <div class="container my-5">
    <h2 class="mb-4 text-center">Admin Dashboard</h2>

    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary" @click="openCreateModal">
        ➕ Add Product
      </button>
    </div>

    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Category</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in paginatedProducts" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>${{ product.price }}</td>
          <td>{{ product.category?.name || product.category }}</td>
          <td>{{ formatDate(product.updatedAt) }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              @click="openEditModal(product)"
            >
              Edit
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteProduct(product.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
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

    <!-- Modal -->
    <ProductFormModal
      :show="showModal"
      :is-editing="isEditing"
      :product="selectedProduct"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
// import ProductFormModal from "@/components/ProductFormModal.vue";

const productStore = useProductStore();
const currentPage = ref(1);
const itemsPerPage = 15;

const showModal = ref(false);
const isEditing = ref(false);
const selectedProduct = ref(null);

// Paginated products
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return productStore.products.slice(start, end);
});

// Total pages
const totalPages = computed(() => {
  return Math.ceil(productStore.products.length / itemsPerPage);
});

// Go to a specific page
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Formats ISO string to readable date (e.g., Jun 11, 2025)
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const openCreateModal = () => {
  isEditing.value = false;
  selectedProduct.value = null;
  showModal.value = true;
};

const openEditModal = (product) => {
  isEditing.value = true;
  selectedProduct.value = product;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedProduct.value = null;
};

const deleteProduct = async (id) => {
  if (confirm("Are you sure you want to delete this product?")) {
    await productStore.deleteProduct(id);
  }
};

onMounted(() => {
  productStore.fetchProducts();
});
</script>
