<template>
  <nav class="d-flex justify-content-center mt-4">
    <ul class="pagination">
      <li
        class="page-item"
        :class="{ disabled: currentPage === 1 }"
        @click="emitPage(currentPage - 1)"
      >
        <button class="page-link text-black">Previous</button>
      </li>
      <li
        v-for="page in totalPages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
        @click="emitPage(page)"
      >
        <button class="page-link">{{ page }}</button>
      </li>
      <li
        class="page-item"
        :class="{ disabled: currentPage === totalPages }"
        @click="emitPage(currentPage + 1)"
      >
        <button class="page-link text-black">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  currentPage: Number,
  totalPages: Number,
});
const emit = defineEmits(["page-change"]);

const emitPage = (page) => {
  emit("page-change", page);
};
</script>

<style scoped>
.page-item.active .page-link {
  background-color: #28a745;
  border-color: white;
  color: white;
}
.page-link {
  cursor: pointer;
}
</style>
