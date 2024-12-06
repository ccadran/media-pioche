<script lang="ts" setup>
import { ref } from 'vue';
import { useArticlesStore } from '~/stores/articles';
import type { Week } from '~/@types/api';
import gsap from 'gsap';



const { data, error } = await useFetch('/api/week');


const weeks = ref<Week[]>([]);
const mainWeek = ref<Week>(); 
const otherWeeks = ref<Week[]>([]);

if (Array.isArray(data.value)){
  weeks.value = data.value.reverse(); 
}


if (weeks.value.length > 0) {
  mainWeek.value = weeks.value[0]; 
  otherWeeks.value = weeks.value.slice(1);
}


function formatDate(date: string): string {
  return date.slice(0, 6);
}

onMounted(() => {
  gsap.to('.loader', {
    delay:3,
    opacity: 0,
    duration: 0.75,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.set('.loader', { display: 'none' });
    },
  });
});
</script>


<template>
  <div class="loader">
    <video src="/assets/videos/Logo_Animation.mp4" autoplay muted ></video>
  </div>
  <div class="weeks-container">
    <img src="/assets/icons/logo.svg" alt="" class="logo">

    <HomeMainWeek :mainWeek="mainWeek!" />
    <HomeWeekList :weeks="otherWeeks" />
  </div>

</template>

<style lang="scss">
.loader{
  position: fixed;
  height: 100svh;
  width: 100svw;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  background-color: var(--white);
  z-index: 1000;
  >video{
    width: 70vw;
  }
}
  .weeks-container{
    display: flex;
    flex-direction: column;

    >.logo{
      width: 32px;
      margin-bottom: 12px;
    }
}

</style>