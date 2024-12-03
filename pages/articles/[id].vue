

<script lang="ts" setup>
import { useArticlesStore } from '~/stores/articles';
import type { Article } from '~/@types/api';

const articleStore = useArticlesStore();

const route = useRoute();
const articleId = route.params.id;
console.log(articleId);
const article = ref({}) as Ref<Article>;

const { data, error } = await useFetch(`/api/article/${articleId}`);

article.value = data.value[0];

onMounted(() => {
  articleStore.nextArticle()
  console.log(articleStore.currentIndex);
})

console.log(articleStore.currentIndex);




</script>

<template>
  <div>
    <p>
        {{ article.title }}
    </p>
    </div>

    <NuxtLink :to="`/articles/${articleStore.articles[articleStore.currentIndex]?.id}`">
  YOOO premier article
</NuxtLink>

</template>

<style lang="scss">

</style>