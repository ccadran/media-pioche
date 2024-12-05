<script lang="ts" setup>
import { defineProps } from 'vue';
import type { suggestedArticles } from '~/@types/api';

// Define the prop that will be passed to this component
const props = defineProps({
  suggestedArticles: {
    type: Array as () => suggestedArticles[],
    required: true
  }
});

console.log(props.suggestedArticles, 'YOOOOO');
</script>

<template>
  <div class="suggested-articles">
    <NuxtLink
      class="suggested-article"
      :to="`/articles/${suggestedArticle.id}`"
      v-for="suggestedArticle in props.suggestedArticles"
      :key="suggestedArticle.id"
    >
      <div class="info">
        <p class="media">{{ suggestedArticle.media }}</p>
        <p class="date">{{ suggestedArticle.date }}</p>
      </div>
      <div class="img-container">
        <img :src="suggestedArticle.cover" alt="" />
      </div>
      <p class="title">{{ suggestedArticle.title }}</p>
    </NuxtLink>
  </div>
</template>


<style scoped lang="scss">
.suggested-articles {
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 18px;
  .suggested-article {
    font-size: 12px;
    .info {
      display: flex;
      justify-content: space-between;
      .media {
        font-weight: 700;
      }
    }
    .img-container {
      height: 120px;
      margin: 4px 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
    }
    .title {
      font-family: Satoshi;
      font-size: 12px;
      font-weight: 700;
    }
  }
}
</style>
