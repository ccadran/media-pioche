<script setup>
import VitePwaManifest from './node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest.js';
import { useFetch } from '#app';


const { data } = await useFetch('/api/articles')


onMounted(() => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {});
    
    if (!cookies.onboardingCompleted) {
      navigateTo('/onboarding')
    }
})


</script>

<template>
  <VitePwaManifest />
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

