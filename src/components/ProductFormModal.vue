<template>
  <div
    class="modal fade show d-block"
    tabindex="-1"
    role="dialog"
    v-if="show"
    style="background: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="handleSubmit">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditing ? "Edit Product" : "Create Product" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="$emit('close')"
            ></button>
          </div>

          <div class="modal-body">
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
              <label class="form-label">Category ID</label>
              <input
                v-model.number="form.categoryId"
                type="number"
                class="form-control"
                required
              />
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

          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">
              {{ isEditing ? "Update" : "Create" }}
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="$emit('close')"
            >
              Cancel
            </button>
          </div>
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

const handleSubmit = async () => {
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

  emit("close");
};
</script>

<style scoped>
.modal {
  z-index: 1050;
}
</style>
