<script lang="ts" setup>
import type { Article } from '~/@types/api';

// Définition des props
defineProps({
  card: {
    type: Object as () => Article,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="card" :class="{ hidden }">
    <div class="img-container">
      <img :src="card.cover" alt="" class="inner">
    </div>
    <div class="card-text">
      <h4>{{ card.title }}</h4>
      <p>{{ card.accroche }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: 412px;
  background-color: #34DF77;
  border-radius: 12px;
  padding: 6px 12px 24px;
  > .img-container {
    max-height: 240px;
    height: 60%;
    > .inner {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  > .card-text {
    margin-top: 22px;
    height: 40%;
    h4 {
      margin-bottom: 12px;
      font-family: Satoshi;
      font-weight: 700;
      font-size: 18px;
      line-height: 100%;
    }
    p {
      font-family: Satoshi;
      font-size: 16px;
      font-weight: 400;
    }
  }
  &.hidden {
    display: none;
  }
}
</style>
