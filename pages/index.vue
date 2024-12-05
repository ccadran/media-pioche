<script lang="ts" setup>
import { ref } from 'vue';
import { useArticlesStore } from '~/stores/articles';
import type { Week } from '~/@types/api';


const { data, error } = await useFetch('/api/week');


const weeks = ref<Week[]>([]);
const mainWeek = ref<Week>(); 
const otherWeeks = ref<Week[]>([]);

if (Array.isArray(data.value)){
  weeks.value = data.value;
}


if (weeks.value.length > 0) {
  mainWeek.value = weeks.value[0]; 
  otherWeeks.value = weeks.value.slice(1);
}


function formatDate(date: string): string {
  return date.slice(0, 6);
}
</script>


<template>
  <div class="weeks-container">
    <HomeMainWeek :mainWeek="mainWeek!" />
    <HomeWeekList :weeks="otherWeeks" />
  </div>

</template>

<style lang="scss">
  .weeks-container{
    display: flex;
    flex-direction: column;
    gap: 52px;
}

</style>