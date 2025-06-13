<template>
  <div class="container my-4">
    <h2>Cart</h2>
    <div v-if="cart.length === 0">Your cart is empty.</div>

    <ul class="list-group">
      <li
        v-for="product in cart"
        :key="product.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <input
            type="checkbox"
            v-model="selected[product.id]"
            class="form-check-input me-2"
          />
          {{ product.title }} - ${{ product.price }}
        </div>
        <button
          @click="removeFromCart(product.id)"
          class="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useProductStore } from "../stores/productStore";

const productStore = useProductStore();
const { cart, removeFromCart } = productStore;

const selected = reactive({});
</script>
