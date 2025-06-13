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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productStore.products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>${{ product.price }}</td>
          <td>{{ product.category?.name || product.category }}</td>
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
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import ProductFormModal from "@/components/ProductFormModal.vue";

const productStore = useProductStore();

const showModal = ref(false);
const isEditing = ref(false);
const selectedProduct = ref(null);

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
