<template>
  <div class="container my-4">
    <button class="btn btn-secondary mb-3" @click="goBack">← Back</button>

    <h2>Favorites</h2>
    <div v-if="productStore.favorites.length === 0">
      No favorite products yet.
    </div>

    <div class="row">
      <div
        v-for="product in productStore.favorites"
        :key="product.id"
        class="col-md-3 mb-4"
      >
        <div class="card h-100">
          <img :src="product.images[0]" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <button
              @click="productStore.removeFromFavorites(product.id)"
              class="btn btn-danger btn-sm"
            >
              <i class="bi bi-trash3"></i> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "../stores/productStore";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
