<script lang="ts" setup>
import { useArticlesStore } from "~/stores/articles";
import type { Article } from "~/@types/api";
import type { suggestedArticles } from "~/@types/api";
import gsap from "gsap";

const articleStore = useArticlesStore();
const route = useRoute();

const article = ref({}) as Ref<Article>;
const suggestedArticles = ref<suggestedArticles[]>([]);

const articleId = route.params.id;

const { data: articleData, error: articleError } = await useFetch(
  `/api/article/${articleId}`
);
const { data: suggestedArticlesData, error: suggestedArticlesError } =
  await useFetch(`/api/suggestedArticles/${articleId}`);

if (Array.isArray(articleData.value)) {
  article.value = articleData.value[0];
}

if (Array.isArray(suggestedArticlesData.value)) {
  suggestedArticles.value = suggestedArticlesData.value;
}

onMounted(() => {
  gsap.from(".article", { opacity: 0.3, ease: "power1.inOut" });
  articleStore.nextArticle();
});

const getBackgroundColor = (theme: string): string => {
  const themeColors: Record<string, string> = {
    justice: "var(--purple)",
    sport: "var(--yellow)",
    culture: "var(--pink)",
    environnement: "var(--green)",
    autre: "var(--blue)",
    politique: "var(--red)",
  };

  return themeColors[theme.toLowerCase()] || "var(--default-color)";
};

const resetStore = () => {
  if (articleStore.currentIndex >= articleStore.articles.length) {
    articleStore.resetCurrentIndex();
    articleStore.resetArticlesArray();
  }
};
</script>

<template>
  <div class="article">
    <div
      class="cover"
      :style="{ backgroundColor: getBackgroundColor(article.theme) }"
    >
      <img :src="article.cover" alt="" />
    </div>
    <h4 class="title">{{ article.title }}</h4>
    <div class="article-content">
      <p>{{ article.accroche }}</p>
      <p>{{ article.paragraph1 }}</p>
      <p v-if="article.paragraph2">{{ article.paragraph2 }}</p>
      <p v-if="article.paragraph3">{{ article.paragraph3 }}</p>
    </div>
    <div v-if="article.illustration" class="article-illustration">
      <img :src="article.illustration" alt="" />
    </div>
    <div class="article-credits">
      <p>{{ article.author }}</p>
      <p class="date">- {{ article.date }}</p>
    </div>
    <div v-if="suggestedArticles.length > 0" class="know-more">
      <h4 v-if="suggestedArticles">Pour en savoir plus:</h4>
      <ArticleSuggestedArticles :suggestedArticles="suggestedArticles" />
    </div>
  </div>
  <div class="read-navigation">
    <div class="infos">
      <p>
        {{ `${articleStore.currentIndex}/${articleStore.articles.length}` }}
      </p>
      <p>{{ `${article.lecture_time}min` }}</p>
    </div>
    <NuxtLink
      :to="
        articleStore.currentIndex < articleStore.articles.length
          ? `/articles/${articleStore.articles[articleStore.currentIndex]?.id}`
          : '/'
      "
      class="continue-reading"
      @click="resetStore()"
    >
      <h3>
        {{
          articleStore.currentIndex < articleStore.articles.length
            ? "Continuer la lecture !"
            : "Retour à l'accueil"
        }}
      </h3>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.article {
  padding-bottom: 25svh;
  > .cover {
    height: 260px;
    margin-left: -20px;
    width: 100svw;
    border-radius: 0px 0px 12px 12px;

    > img {
      border-radius: 0px 0px 12px 12px;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  h4 {
    font-family: Satoshi;
    font-size: 18px;
    font-weight: 700;
  }
  > .title {
    margin-top: 24px;
  }
  > .article-content {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    > p {
      font-family: Satoshi;
      font-size: 16px;
      line-height: 150%;
    }
  }
  > .article-illustration {
    height: 220px;
    margin-top: 24px;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  > .article-credits {
    margin-top: 34px;
    display: flex;
    margin-bottom: 64px;
    font-size: 12px;
    > .date {
      font-weight: 700;
    }
  }
}
.read-navigation {
  height: 20svh;
  width: 100%;
  left: 0;
  background-color: var(--grey);
  position: fixed;
  bottom: 0;
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 24px 24px 0px 0px;
  > .infos {
    display: flex;
    justify-content: space-between;
    width: 100%;
    > p {
      font-family: Satoshi;
      font-size: 14px;
      line-height: 100%;
    }
  }
  > .continue-reading {
    width: 100%;
    background-color: var(--black);
    padding: 12px;
    display: flex;
    justify-content: center;
    color: var(--white);
    border-radius: 12px;
    > h3 {
      text-align: center;
      font-family: Clash Grotesk;
      font-size: 22px;
      font-weight: 700;
    }
  }
}
</style>
