<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Article } from '~/@types/api';

// Définir les props pour recevoir les données et les fonctions nécessaires
defineProps({
  lectureTime: {
    type: Number,
    required: true,
  },
  progressWidth: {
    type: String,
    required: true,
  },
  onSkip: {
    type: Function,
    required: true,
  },
  onAddToStore: {
    type: Function,
    required: true,
  },
  read_target: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="choices">
    <button @click="onSkip()" class="denied">
      <img src="/assets/icons/cross.svg" alt="Skip">
    </button>
    <div class="lecture-time">
      <p>{{ `${lectureTime}/${read_target}min` }}</p>
      <div class="time-progress">
        <div class="progress" :style="{ width: progressWidth }"></div>
      </div>
    </div>
    <button @click="onAddToStore()" class="check">
      <img src="/assets/icons/check.svg" alt="Add">
    </button>
  </div>
</template>

<style lang="scss" scoped>
.choices {
  display: flex;
  position: absolute;
  bottom: 54px;
  justify-content: space-between;
  width: 100%;
  > .denied {
    background-color: var(--black);
    height: 65px;
    width: 65px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    > img {
      width: 22px;
    }
  }
  > .lecture-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-family: Clash Grotesk;
      font-size: 16px;
      font-weight: 500;
    }
    > .time-progress {
      background-color: var(--black);
      height: 8px;
      border-radius: 4px;
      margin-top: 8px;
      width: 168px;
      > .progress {
        background-color: var(--white);
        height: 100%;
        border-radius: 4px;
      }
    }
  }
  > .check {
    background-color: var(--black);
    height: 65px;
    width: 65px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 30px;
    }
  }
}
</style>
