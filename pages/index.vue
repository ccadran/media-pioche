<script lang="ts" setup>
import { useArticlesStore } from '~/stores/articles';
const { data } = await useFetch('/api/week') 

const articlesStores = useArticlesStore();

const weeks = ref(data.value)



console.log(weeks.value);


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