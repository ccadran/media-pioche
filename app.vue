<script setup>




const { data } = await useFetch('/api/articles')

onBeforeMount(() => {
    navigateTo('/onboarding')
})

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  </template>

<style lang="scss">

</style>

