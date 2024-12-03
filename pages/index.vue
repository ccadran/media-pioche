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
</script>


<template>
  <div class="weeks-container">
    <div class="main-week">
      <h3>{{ mainWeek!.date }}</h3>
      <div class="img-container">
        <img :src="mainWeek!.cover" alt="">
      </div>
    </div>
    <div class="weeks-list">
      <div v-for="week in otherWeeks" class="week">
        <h3>{{ week.date }}</h3>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
  .weeks-container{
    display: flex;
    flex-direction: column;
    >.main-week{
      background-color: #34DF77;
      display: flex;
      flex-direction: column;
      max-height: 300px;
      border-radius: 12px;
      padding: 14px;
      h3{
        font-family: Clash Grotesk;
        text-transform: uppercase;

      }
      >.img-container{
        height: 100%;
        overflow: hidden;
        border-radius: 12px;
        >img{
          width: 100%;
          height: auto;
          object-fit: cover;

        }
      }
    }
  }

</style>