<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card p-4 shadow" style="min-width: 350px">
      <h2 class="text-center mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label>Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            required
          />
        </div>
        <button class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
        <p class="text-danger mt-2" v-if="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const router = useRouter();
const userStore = useUserStore();

const handleLogin = async () => {
  loading.value = true;
  error.value = "";
  try {
    await userStore.login(email.value, password.value);
    router.push("/products");
  } catch (err) {
    error.value = "Invalid email or password.";
  } finally {
    loading.value = false;
  }
};
</script>
