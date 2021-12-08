<template>
  <main id="app" class="max-w-1140 m-auto">
    <MainGrid />
  </main>
</template>

<script>
import MainGrid from "./components/MainGrid.vue";
export default {
  name: "app",
  components: {
    MainGrid,
  },
};
</script>
