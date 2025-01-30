<script lang="ts" setup>
import { ref } from "vue";
import { useArticlesStore } from "~/stores/articles";
import type { Week } from "~/@types/api";
import gsap from "gsap";

const { data, error } = await useFetch("/api/week");

const weeks = ref<Week[]>([]);
const mainWeek = ref<Week>();
const otherWeeks = ref<Week[]>([]);

if (Array.isArray(data.value)) {
  weeks.value = [...data.value].reverse();
}

if (weeks.value.length > 0) {
  mainWeek.value = weeks.value[0];
  otherWeeks.value = weeks.value.slice(1);
}

function formatDate(date: string): string {
  return date.slice(0, 6);
}

const showLoader = ref(true);

onBeforeMount(() => {
  // Vérifier si c'est la première visite
  const hasVisited = sessionStorage.getItem("hasVisitedBefore");

  if (!hasVisited) {
    // Première visite : montrer le loader
    showLoader.value = true;
    gsap.set(".loader", { display: "flex" });
    gsap.to(".loader", {
      delay: 3,
      opacity: 0,
      duration: 0.75,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(".loader", { display: "none" });
        sessionStorage.setItem("hasVisitedBefore", "true");
      },
    });
  } else {
    showLoader.value = false;

    gsap.set(".loader", { display: "none" });
  }
});
</script>

<template>
  <div class="loader">
    <video
      src="/assets/videos/Logo_Animation.mp4"
      autoplay
      muted
      playsinline
    ></video>
  </div>
  <div class="weeks-container">
    <img src="/assets/icons/logo.svg" alt="" class="logo" />

    <HomeMainWeek :mainWeek="mainWeek!" :delayed="showLoader" />
    <HomeWeekList :weeks="otherWeeks" :delayed="showLoader" />
  </div>
</template>

<style lang="scss">
.loader {
  display: none;
  position: fixed;
  height: 100svh;
  width: 100svw;

  justify-content: center;
  align-items: center;
  left: 0;
  background-color: var(--white);
  z-index: 1000;
  > video {
    width: 70vw;
  }
}
.weeks-container {
  display: flex;
  flex-direction: column;

  > .logo {
    width: 32px;
    margin-bottom: 12px;
  }
}
</style>
