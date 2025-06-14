<template>
  <div
    class="modal fade show d-block rounded-3"
    tabindex="-1"
    role="dialog"
    v-if="show"
    style="background: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="handleSubmit">
          <!-- Modal Header -->
          <div
            class="modal-header text-white"
            style="background-color: #28a745"
          >
            <h5 class="modal-title">
              {{ isEditing ? "Edit Product" : "Add Product" }}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="$emit('close')"
            ></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body px-4 py-3">
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input
                v-model="form.title"
                type="text"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Price</label>
              <input
                v-model.number="form.price"
                type="number"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea
                v-model="form.description"
                class="form-control"
                required
              ></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label">Category</label>
              <select
                v-model.number="form.categoryId"
                class="form-select"
                required
              >
                <option disabled value="">-- Select a Category --</option>
                <option
                  v-for="category in productStore.categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Image URL</label>
              <input
                v-model="form.image"
                type="text"
                class="form-control"
                required
              />
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer px-4">
            <button type="submit" class="btn btn-success" :disabled="isLoading">
              {{ isEditing ? "Update" : "Create" }}
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              :disabled="isLoading"
              @click="$emit('close')"
            >
              Cancel
            </button>
          </div>

          <!-- Success Modal -->
          <!-- Centered Success Toast -->
          <div
            v-if="isSuccess"
            class="position-fixed top-50 start-50 translate-middle alert alert-success shadow-lg text-center fs-5"
            style="z-index: 9999; width: 400px; padding: 1.5rem 1rem"
          >
            ✅
            {{
              isEditing ? "Product updated" : "Product created"
            }}
            successfully!
          </div>

          <!-- ========================= -->
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";

const props = defineProps({
  show: Boolean,
  isEditing: Boolean,
  product: Object,
});
const emit = defineEmits(["close"]);
const productStore = useProductStore();

const isLoading = ref(false);
const isSuccess = ref(false);

const form = ref({
  title: "",
  price: null,
  description: "",
  categoryId: null,
  image: "",
});

watch(
  () => props.product,
  (newProduct) => {
    if (props.isEditing && newProduct) {
      form.value = {
        title: newProduct.title,
        price: newProduct.price,
        description: newProduct.description,
        categoryId: newProduct.category?.id || newProduct.categoryId,
        image: newProduct.images ? newProduct.images[0] : "",
      };
    } else {
      form.value = {
        title: "",
        price: null,
        description: "",
        categoryId: null,
        image: "",
      };
    }
  },
  { immediate: true }
);

onMounted(() => {
  productStore.fetchCategories();
});

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    const payload = {
      title: form.value.title,
      price: form.value.price,
      description: form.value.description,
      categoryId: form.value.categoryId,
      images: [form.value.image],
    };

    if (props.isEditing && props.product?.id) {
      await productStore.updateProduct(props.product.id, payload);
    } else {
      await productStore.createProduct(payload);
    }

    isSuccess.value = true;
    setTimeout(() => {
      isSuccess.value = false;
      emit("close");
    }, 1500);
  } catch (error) {
    alert("Something went wrong!");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.modal {
  z-index: 1050;
}
</style>
