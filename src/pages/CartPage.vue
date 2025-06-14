<template>
  <div class="container my-4">
    <button class="btn btn-secondary mb-3" @click="goBack">← Back</button>

    <h2>Cart</h2>
    <div v-if="productStore.cart.length === 0">Your cart is empty.</div>

    <ul class="list-group">
      <li
        v-for="product in productStore.cart"
        :key="product.id"
        class="list-group-item d-flex align-items-center justify-content-between"
      >
        <!-- Left side: Checkbox, Image, Title + Price -->
        <div class="d-flex align-items-center">
          <input
            type="checkbox"
            v-model="selected[product.id]"
            class="form-check-input me-3"
          />
          <img
            :src="product.images[0]"
            alt="Product Image"
            style="
              width: 50px;
              height: 50px;
              object-fit: cover;
              border-radius: 6px;
            "
            class="me-3"
          />
          <div>{{ product.title }} - ${{ product.price }}</div>
        </div>

        <!-- Right side: Delete button -->
        <button
          @click="productStore.removeFromCart(product.id)"
          class="btn btn-danger btn-sm"
        >
          <i class="bi bi-trash3"></i> Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useProductStore } from "../stores/productStore";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const router = useRouter();

const selected = reactive({});

const goBack = () => {
  router.back();
};
</script>
