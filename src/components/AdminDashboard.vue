<template>
  <div class="container my-5">
    <h2 class="mb-4 text-center text-uppercase fw-bold border-bottom pb-2">
      Admin Dashboard
    </h2>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <button class="btn btn-outline-secondary" @click="goBack">
        <i class="bi bi-arrow-left"></i> Back
      </button>
      <button class="btn btn-success" @click="openCreateModal">
        <!-- Add products -->
        <i class="bi bi-plus-lg text-white"></i> Add Product
      </button>
    </div>

    <table class="table table-bordered table-striped">
      <thead class="table-success">
        <tr class="bg-success" style="background-color: #198754; color: white">
          <th class="py-3 px-4">ID</th>
          <th class="py-3 px-4">Image</th>
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
          <td class="py-3 px-4">
            <img
              :src="product.images[0]"
              alt="Product Image"
              style="
                width: 60px;
                height: 60px;
                object-fit: cover;
                border-radius: 6px;
              "
            />
          </td>
          <td class="py-3 px-4">{{ product.title }}</td>
          <td class="py-3 px-4">${{ product.price }}</td>
          <td class="py-3 px-4">
            {{ product.category?.name || product.category }}
          </td>
          <td class="py-3 px-4">{{ formatDate(product.updatedAt) }}</td>
          <!-- Update and Delete products -->
          <!-- <td class="py-3 px-4">
            <button
              class="btn btn-warning btn-sm me-2 px-3 py-2"
              @click="openEditModal(product)"
            >
              <i class="bi bi-pencil-square"></i>
              Edit
            </button>
            <button
              class="btn btn-danger btn-sm px-3 py-2"
              @click="deleteProduct(product.id)"
            >
              <i class="bi bi-trash3"></i>
              Delete
            </button>
          </td> -->
          <td class="py-3 px-4">
            <button
              class="btn btn-warning btn-sm me-2 d-flex align-items-center mb-2 gap-2 px-3 py-2"
              @click="openEditModal(product)"
            >
              <i class="bi bi-pencil-square"></i>
              Edit
            </button>
            <button
              class="btn btn-danger btn-sm d-flex align-items-center gap-2 px-3 py-2"
              @click="confirmDelete(product.id)"
            >
              <i class="bi bi-trash3"></i>
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

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="modal fade show d-block"
      tabindex="-1"
      style="background: rgba(0, 0, 0, 0.5); z-index: 1060"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-danger">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Confirm Delete</h5>
          </div>
          <div class="modal-body">
            Are you sure you want to delete
            <strong>{{ productToDelete?.title }}</strong
            >?
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              @click="showDeleteConfirm = false"
            >
              Cancel
            </button>
            <button class="btn btn-danger" @click="performDelete">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Success Modal -->
    <div
      v-if="showDeleteSuccess"
      class="position-fixed top-50 start-50 translate-middle alert alert-danger shadow-lg text-center fs-5"
      style="z-index: 9999; width: 400px; padding: 1.5rem 1rem"
    >
      ✅ Product deleted successfully!
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import ProductFormModal from "@/components/ProductFormModal.vue";
import Pagination from "@/components/Pagination.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const productStore = useProductStore();
const currentPage = ref(1);
const itemsPerPage = 15;

const showModal = ref(false);
const isEditing = ref(false);
const selectedProduct = ref(null);

const productToDelete = ref(null);
const showDeleteConfirm = ref(false);
const showDeleteSuccess = ref(false);

const goBack = () => {
  router.back(); // goes to the previous route
  // Or use router.push("/") to go to a specific route
};
// Paginated products
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return productStore.filteredProducts.slice(start, end);
});

// Total pages
const totalPages = computed(() => {
  return Math.ceil(productStore.filteredProducts.length / itemsPerPage);
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

const confirmDelete = (product) => {
  productToDelete.value = product;
  showDeleteConfirm.value = true;
};

// const deleteProduct = async (id) => {
//   if (confirm("Are you sure you want to delete this product?")) {
//     await productStore.deleteProduct(id);
//   }
// };
const performDelete = async () => {
  try {
    await productStore.deleteProduct(productToDelete.value);
    showDeleteConfirm.value = false;
    showDeleteSuccess.value = true;

    // Automatically hide after 1.5s
    setTimeout(() => {
      showDeleteSuccess.value = false;
    }, 1500);
  } catch (err) {
    alert("Failed to delete product.");
  } finally {
    productToDelete.value = null;
  }
};

onMounted(() => {
  productStore.fetchProducts();
});
</script>
