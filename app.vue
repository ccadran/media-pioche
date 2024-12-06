<script setup>

const { data } = await useFetch('/api/articles')


</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
.overlay {
  position: fixed;
  top: -100%; /* Start out of the viewport */
  left: 0;
  width: 100%;
  height: 100%;
  background: #000; /* Black color */
  z-index: 9999;
  pointer-events: none;
  //transition: transform 0.8s ease-in-out;
}
</style>

