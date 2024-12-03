<script lang="ts" setup>
import { ref } from 'vue';
import { useArticlesStore } from '~/stores/articles';
import type { Week } from '~/@types/api';

// Chargement des semaines depuis l'API
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

console.log(mainWeek.value);
console.log(otherWeeks.value);


</script>


<template>
  <div class="weeks-container">
    <div class="main-week">
      <h1>{{ mainWeek!.date }}</h1>
    </div>
    <div class="weeks-list">
      <div v-for="week in otherWeeks" class="week">
        <h3>{{ week.date }}</h3>
      </div>
    </div>
  </div>

</template>

<style lang="scss">


</style>