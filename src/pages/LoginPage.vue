<template>
  <section class="h-100 gradient-form" style="background-color: #eee">
    <div class="row g-0 h-100">
      <div class="col-lg-6">
        <div class="card-body p-md- mx-md-4">
          <div class="text-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              style="width: 185px"
              alt="logo"
            />
            <h4 class="mt-1 mb-5 pb-1">This is The Rkived Team</h4>
          </div>

          <p>Please login to your account</p>

          <form
            @submit.prevent="handleLogin"
            class="col-lg-10 mt-5 container justify-content-center align-items-center"
          >
            <div class="mb-3">
              <label>Email</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                required
              />
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
      <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
        <div class="text-white px-3 py-4 p-md-5 mx-md-4">
          <h4 class="mb-4">We are more than just a company</h4>
          <p class="small mb-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
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
  /* fallback for old browsers */
  background: #fccb90;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    #ee7724,
    #d8363a,
    #dd3675,
    #b44593
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  /* background: linear-gradient(to right, #8e56a6, #d8363a, #dd3675, #b44593); */
  background: linear-gradient(to right, #6b705c, #cb997e, #a5a58d);
}

@media (min-width: 768px) {
  .gradient-form {
    height: 100vh !important;
  }
}
@media (min-width: 769px) {
  .gradient-custom-2 {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
}
</style>
