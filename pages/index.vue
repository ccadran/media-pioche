<script lang="ts" setup>
const { data } = await useFetch('/api/week') 

const weeks = ref(data.value)

</script>

<template>
  <div>
    <h1>Articles</h1>
    <ul>
      <li v-for="week in weeks" :key="week.id">
        <nuxt-link :to="`/swipe/${week.id}`">{{ week.date }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">

</style>