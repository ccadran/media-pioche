<script lang="ts" setup>
import type { Week } from "~/@types/api";
import { onMounted } from "vue";
import gsap from "gsap";

const props = defineProps({
  weeks: {
    type: Array as () => Week[],
    required: true,
  },
  delayed: {
    type: Boolean,
  },
});

function formatDate(dateString: string): string {
  const parts = dateString.split(" "); // Divise la chaîne
  return `${parts[0]} ${parts[1]}`; // Combine le jour et le mois
}
onMounted(() => {
  gsap.fromTo(
    ".week",
    {
      y: -100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.1,
      delay: props.delayed ? 3.3 : 0.3,
      ease: "expo",
    }
  );
});
</script>

<template>
  <div class="weeks-list">
    <NuxtLink
      v-for="week in weeks"
      :key="week.id"
      :to="`/swipe/${week.id}`"
      class="week"
    >
      <div class="date">
        <h3>
          SEMAINE DU <br />
          <span>{{ formatDate(week.date) }}</span>
        </h3>
      </div>
      <div class="cover">
        <img :src="week.cover" alt="" />
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.weeks-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 44px;

  .week {
    opacity: 0;
    background-color: var(--grey);
    border-radius: 12px;
    display: grid;
    grid-template-columns: repeat(2, 50%);
    align-items: center;
    width: 100%;

    height: 100px;

    > .date {
      padding: 14px;
      h3 {
        font-family: Clash Grotesk;
        text-transform: uppercase;
        font-size: 20px;
        line-height: 100%;
        font-weight: 400;
        > span {
          font-weight: 700;
        }
      }
    }
    .cover {
      width: 100%;
      height: 100px;
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
