<script lang="ts" setup>
import type { Week } from '~/@types/api';
import { onMounted } from 'vue';
import gsap from 'gsap';

defineProps({
  mainWeek: {
    type: Object as () => Week,
    required: true,
  },
});

function formatDate(date: string): string {
  return date.slice(0, 6);
}

onMounted(() => {
  gsap.from(".main-week", {
    y: -100, 
    opacity: 0, 
    duration: 1,
    ease: "expo", 
  });
})
</script>

<template>
  <NuxtLink :to="`/swipe/${mainWeek.id}`" class="main-week">
    <h4>
      semaine du <span>{{ formatDate(mainWeek.date) }}</span>
    </h4>
    <div class="img-container">
      <img :src="mainWeek.cover" alt="">
    </div>
    <h3>Les actus de la semaine</h3>
    <div class="border">
      <div class="color"></div>
      <div class="color"></div>
      <div class="color"></div>
      <div class="color"></div>
      <div class="color"></div>
      <div class="color"></div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.main-week {
  position: relative;
  overflow: hidden;
  background-color: var(--black);
  color: var(--white);
  display: flex;
  flex-direction: column;
  max-height: 340px;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 52px;
  h4 {
    font-family: Clash Grotesk;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 24px;
    line-height: 100%;
    > span {
      font-weight: 700;
    }
  }
  > .img-container {
    height: 100%;
    overflow: hidden;
    border-radius: 12px;
    margin: 8px 0;
    > img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
  h3 {
    font-family: Clash Grotesk;
    text-transform: uppercase;
    font-size: 42px;
    line-height: 100%;
    margin-bottom: 12px;
  }
  > .border {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    display: flex;
    height: 10px;
    > .color {
      background-color: #34df77;
      width: 100%;
      height: 100%;
      &:nth-child(1) {
        background-color: var(--purple);
      }
      &:nth-child(2) {
        background-color: var(--yellow);
      }
      &:nth-child(3) {
        background-color: var(--pink);
      }
      &:nth-child(4) {
        background-color: var(--green);
      }
      &:nth-child(5) {
        background-color: var(--blue);
      }
      &:nth-child(6) {
        background-color: var(--red);
      }
    }
  }
}
</style>
