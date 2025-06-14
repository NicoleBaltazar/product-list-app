<template>
  <div class="container my-5">
    <h2 class="mb-4 text-center text-uppercase fw-bold border-bottom pb-2">
      Admin Dashboard
    </h2>

    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-success" @click="openCreateModal">
        <i class="bi bi-plus-lg text-white"></i> Add Product
      </button>
    </div>

    <table class="table table-bordered table-striped">
      <thead class="text-white" style="background-color: #198754">
        <tr>
          <th class="py-3 px-4">ID</th>
          <th class="py-3 px-4">Title</th>
          <th class="py-3 px-4">Price</th>
          <th class="py-3 px-4">Category</th>
          <th class="py-3 px-4">Updated At</th>
          <th class="py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in paginatedProducts" :key="product.id">
          <td class="py-3 px-4">{{ product.id }}</td>
          <td class="py-3 px-4">{{ product.title }}</td>
          <td class="py-3 px-4">${{ product.price }}</td>
          <td class="py-3 px-4">
            {{ product.category?.name || product.category }}
          </td>
          <td class="py-3 px-4">{{ formatDate(product.updatedAt) }}</td>
          <td class="py-3 px-4">
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
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-change="goToPage"
    />

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
import ProductFormModal from "@/components/ProductFormModal.vue";
import Pagination from "@/components/Pagination.vue";

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
