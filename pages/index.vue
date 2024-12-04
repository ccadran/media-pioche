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
    <NuxtLink :to="`/swipe/${mainWeek!.id}`" class="main-week">
      <h4>{{ formatDate(mainWeek!.date )}}</h4>
      <div class="img-container">
        <img :src="mainWeek!.cover" alt="">
      </div>
      <h3>Les actus de la semaine</h3>
    </NuxtLink>
    <div class="weeks-list">
        <NuxtLink :to="`/swipe/${week.id}`" v-for="week in otherWeeks" class="week">
          <h3>{{ formatDate(week.date) }}</h3>
        </NuxtLink>
    </div>
  </div>

</template>

<style lang="scss">
  .weeks-container{
    display: flex;
    flex-direction: column;
    gap: 52px;
    >.main-week{
      background-color: #34DF77;
      display: flex;
      flex-direction: column;
      max-height: 300px;
      border-radius: 12px;
      padding: 14px;
      h4{
        font-family: Clash Grotesk;
        text-transform: uppercase;
        font-size: 24px;
        line-height: 100%;
        opacity: 0.5;
      }
      >.img-container{
        height: 100%;
        overflow: hidden;
        border-radius: 12px;
        margin: 8px 0;
        >img{
          width: 100%;
          height: auto;
          object-fit: cover;

        }
      }
      h3{
        font-family: Clash Grotesk;
        text-transform: uppercase;
        font-size: 42px;
        line-height: 100%;
      }
    }
    >.weeks-list{
      display: flex;
      flex-direction: column;
      gap: 16px;
      >.week{
        background-color: #34DF77;
        border-radius: 12px;
        padding: 14px;
        h3{
          font-family: Clash Grotesk;
          text-transform: uppercase;
          font-size: 24px;
          line-height: 100%;
        }
      }
    }
  }

</style>