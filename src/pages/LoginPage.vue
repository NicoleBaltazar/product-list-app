<template>
  <section class="h-100 gradient-form bg-white">
    <div class="row g-0 h-100">
      <!-- Left Form Side -->
      <div class="col-lg-6 d-flex align-items-center justify-content-center">
        <div class="p-4 p-md-5 col-lg-8">
          <div class="text-center mb-4">
            <span class="fs-1 text-success">📚</span>
            <h4 class="mt-3 fw-bold text-success">This is The Rkived Team</h4>
          </div>

          <p class="text-muted text-center mb-4">
            Please login to your account
          </p>

          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label fw-semibold">Email</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Password</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                required
              />
            </div>

            <button
              class="btn btn-success w-100 fw-semibold"
              :disabled="loading"
            >
              {{ loading ? "Logging in..." : "Login" }}
            </button>

            <p class="text-danger mt-2 text-center" v-if="error">{{ error }}</p>
          </form>
        </div>
      </div>

      <!-- Right Description Side -->
      <div
        class="col-lg-6 d-none d-lg-flex align-items-center justify-content-center gradient-custom-2 text-white px-5"
      >
        <div class="text-white text-start w-100">
          <h1 class="d-lg-flex align-items-center justify-content-center">
            ...
          </h1>
          <h1
            class="fw-bold mb-3"
            style="
              font-size: 3rem;

              letter-spacing: 0.5px;
              font-weight: 300;
              margin-left: 20px;
            "
          >
            <span style="font-size: 3rem; font-weight: 600">R</span>kived helps
            you track, manage, and preserve what matters most.
            <br />
            Whether you're archiving memories or managing a product collection,
            we're here to help.
          </h1>
          <h1 class="d-lg-flex align-items-center justify-content-center">
            ...
          </h1>
        </div>
      </div>
    </div>
  </section>
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

<style scoped>
.gradient-custom-2 {
  background: linear-gradient(to bottom left, #28a745, #000000);
  height: 100%;
}

.gradient-form {
  height: 100vh !important;
}

.form-control:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}
</style>
