<script lang="ts" setup>
import { useArticlesStore } from "~/stores/articles";
import type { Article } from "~/@types/api";
import gsap from "gsap";

const route = useRoute();
console.log(route.params);

const week = route.params.weekrecap;

const articles = ref<Article[]>([]);

const { data, error } = await useFetch(`/api/articles/${week}`);
if (data.value) {
  articles.value = data.value as Article[];
}

const addArticleToStore = (article: Article) => {
  console.log(article);

  articlesStore.addArticle(article);
};

const removeArticleFromStore = (article: Article) => {
  console.log(article);

  articlesStore.removeArticle(article.id);
};

const articlesStore = useArticlesStore();
const currentArticle = articlesStore.currentIndex;

const isArticleInStore = (article: Article) => {
  return articlesStore.articles.some(
    (storeArticle) => storeArticle.id === article.id
  );
};

const totalReadingTime = computed(() => {
  return articlesStore.articles.reduce(
    (total, article) => total + article.lecture_time,
    0
  );
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
onMounted(() => {
  const enterTl = gsap.timeline();
  enterTl
    .fromTo(
      ".card",
      {
        y: 100,
        opacity: 0,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.05,
        ease: "power1.out",
      }
    )
    .fromTo(
      ".confirmation",
      {
        y: "100%",
      },
      {
        y: "0%",
        duration: 0.75,
        ease: "power1.inOut",
      },
      0.25
    );
});
</script>

<template>
  <div class="recap">
    <div class="navigation">
      <NuxtLink :to="`/swipe/${week}`" class="back">
        <img src="/assets/icons/back.svg" alt="" />
      </NuxtLink>
      <div class="title">
        <h3>RÉCAP</h3>
      </div>
    </div>
    <h4>Sur de ton choix ?</h4>
    <div class="recap-cards-container">
      <RecapCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
        :isInStore="isArticleInStore(article)"
        :onToggle="
          () =>
            isArticleInStore(article)
              ? removeArticleFromStore(article)
              : addArticleToStore(article)
        "
        :style="{ backgroundColor: getBackgroundColor(article.theme) }"
      />
    </div>
    <div class="confirmation">
      <div class="confirmation-info">
        <p>{{ `${articlesStore.articles.length} articles` }}</p>
        <p>{{ `${totalReadingTime}min de lecture` }}</p>
      </div>
      <NuxtLink
        :to="`/articles/${articlesStore.articles[currentArticle]?.id}`"
        class="confirmation-btn"
      >
        <h3>Commencer la lecture !</h3>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
.recap {
  > h4 {
    font-family: Clash Grotesk;
    font-weight: 500;
    font-size: 22px;
    text-align: center;
    margin-top: 64px;
    margin-bottom: 42px;
  }
  > .recap-cards-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 18px;
    row-gap: 34px;
    padding-bottom: 25svh;
  }
  > .confirmation {
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
    > .confirmation-info {
      display: flex;
      justify-content: space-between;
      > p {
        font-family: Satoshi;
        font-size: 14px;
        line-height: 100%;
      }
    }
    > .confirmation-btn {
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
}
</style>
