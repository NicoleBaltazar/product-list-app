<template>
  <div class="container my-4">
    <h2>Favorites</h2>
    <div v-if="favorites.length === 0">No favorite products yet.</div>

    <div class="row">
      <div v-for="product in favorites" :key="product.id" class="col-md-3 mb-4">
        <div class="card h-100">
          <img :src="product.images[0]" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <button
              @click="removeFromFavorites(product.id)"
              class="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "../stores/productStore";
const productStore = useProductStore();
const { favorites, removeFromFavorites } = productStore;
</script>
