<script setup>
import VitePwaManifest from "./node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest.js";
import { useFetch } from "#app";

const { data } = await useFetch("/api/articles");

onMounted(() => {
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
  }, {});

  if (!cookies.onboardingCompleted) {
    navigateTo("/onboarding");
  }
});
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <BlockWidth />
</template>

<style lang="scss"></style>
