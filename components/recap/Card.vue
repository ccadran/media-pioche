<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Article } from '~/@types/api';

// Déclarez les props pour recevoir les données et fonctions nécessaires
defineProps({
  article: {
    type: Object as () => Article,
    required: true,
  },
  isInStore: {
    type: Boolean,
    required: true,
  },
  onToggle: {
    type: Function as () => void,
    required: true,
  },
});
</script>

<template>
  <NuxtLink class="card" :class="{ 'in-store': isInStore }" @click="onToggle">
    <img :src="article.cover" alt="" class="cover" />
    <div class="toggle-btn">
      <img v-if="isInStore" src="/assets/icons/minus.svg" alt="remove" class="remove" />
      <img v-if="!isInStore" src="/assets/icons/add.svg" alt="add" class="add" />
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.card {
  background-color: green;
  height: 104px;
  border-radius: 8px;
  position: relative;
  > .cover {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  > .toggle-btn {
    position: absolute;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--black);
    border-radius: 50%;
    top: -15px;
    left: -10px;
    > img {
      width: 15px;
      height: 15px;
    }
  }
  &.in-store {
    filter: grayscale(1);
  }
}
</style>
