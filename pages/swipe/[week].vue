<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useArticlesStore } from "~/stores/articles";
import { useReadingTimeStore } from "~/stores/readingTime";
import type { Article } from "~/@types/api";
import gsap from "gsap";

const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return cookies[name];
};

const route = useRoute();

const articlesStore = useArticlesStore();
//const readingTimeStore = useReadingTimeStore();
const readingTimeCookie = Number(getCookie("readingTime"));

const week = route.params.week;

const articles = ref<Article[]>([]);

const lectureTime = ref(0);

const { data, error } = await useFetch(`/api/articles/${week}`);
if (data.value) {
  articles.value = data.value as Article[];
}

const addToStore = (article: Article) => {
  articlesStore.addArticle(article);
  console.log("add to store");
  console.log(articlesStore.articles, "articles in store");
  lectureTime.value += article.lecture_time;

  currentCardIndex.value++;

  gsap.to(`.card[data-index="${currentCardIndex.value - 1}"]`, {
    x: 600,
    duration: 1,
    ease: "power2.out",
    scale: 0.8,
  });
};

const skipArticle = () => {
  currentCardIndex.value++;
  gsap.to(`.card[data-index="${currentCardIndex.value - 1}"]`, {
    x: -600,
    duration: 1,
    ease: "power2.out",
    scale: 0.8,
  });
};

const removeFromStore = (article: Article) => {
  articlesStore.removeArticle(article.id);
};

const backBtn = () => {
  if (currentCardIndex.value > 0) {
    gsap.to(`.card[data-index="${currentCardIndex.value - 1}"]`, {
      x: 0,
      duration: 0.5,
      ease: "power2.out",
      scale: 1,
    });
    const previousCard = articles.value[currentCardIndex.value - 1];
    const isInStore = articlesStore.articles.some(
      (article) => article.id === previousCard.id
    );
    if (isInStore) {
      removeFromStore(previousCard);
      lectureTime.value -= previousCard.lecture_time;
    }
    currentCardIndex.value--;
  } else {
    navigateTo(`/`);
  }
};

const currentArticle = articlesStore.currentIndex;

const currentCard = ref<Article>();
const currentCardIndex = ref(0);
currentCard.value = articles.value[currentCardIndex.value];

watch(currentCardIndex, () => {
  if (currentCardIndex.value < articles.value.length) {
    currentCard.value = articles.value[currentCardIndex.value];
  } else {
    navigateTo(`/recap/${week}`);
  }
});

const progressWidth = computed(() => {
  const percentage = (lectureTime.value / readingTimeCookie) * 100;
  return `${Math.min(percentage, 100)}%`; // Limiter à 100%
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
  const enterTl = gsap.timeline({ delay: 0.2 });

  enterTl
    .fromTo(
      ".card",
      {
        y: 100,
      },
      {
        y: 0,
        duration: 0.7,
        ease: "power1.out",
        stagger: 0.02,
      }
    )
    .fromTo(
      ".cards-container",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      },
      0
    )
    .fromTo(
      ".denied",
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power1.inOut",
      },
      0.25
    )
    .fromTo(
      ".check",
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power1.inOut",
      },
      0.25
    )
    .fromTo(
      ".lecture-time",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      },
      0.75
    );
});

const indexDisplay = ref<number>(currentCardIndex.value + 1);
watch(currentCardIndex, () => {
  if (currentCardIndex.value + 1 > articles.value.length) {
    indexDisplay.value = articles.value.length;
  } else {
    indexDisplay.value = currentCardIndex.value + 1;
  }
});
</script>

<template>
  <div class="swipe">
    <div class="navigation">
      <button @click="backBtn()" class="back">
        <img src="/assets/icons/back.svg" alt="" />
      </button>
      <div v-if="articles.length > 0" class="title counter">
        <h3>{{ `${indexDisplay} / ${articles.length}` }}</h3>
      </div>
    </div>
    <div v-if="articles.length <= 0" class="cards-container">
      <h4>Pas de cartes disponible pour cetter semaine !</h4>
    </div>
    <div v-if="articles.length > 0" class="cards-container">
      <h4>Pioche tes cartes !</h4>
      <SwipeCard
        v-for="(card, index) in articles"
        :key="card.id"
        :card="card"
        :index="index"
        :onSkip="skipArticle"
        :onAddToStore="() => addToStore(currentCard!)"
        :style="{ backgroundColor: getBackgroundColor(card.theme) }"
      />
    </div>
    <SwipeChoices
      v-if="articles.length > 0"
      :lectureTime="lectureTime"
      :progressWidth="progressWidth"
      :onSkip="skipArticle"
      :onAddToStore="() => addToStore(currentCard!)"
      :read_target="readingTimeCookie"
    />
  </div>
</template>

<style lang="scss">
.swipe {
  height: 100svh;
  position: relative;
  overflow: hidden;
}
.navigation {
  padding-top: 24px;
  display: flex;
  position: relative;
  align-items: center;
  > .back {
    background-color: var(--black);
    height: 50px;
    width: 50px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    > img {
      width: 22px;
    }
  }
  > .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--black);
    padding: 6px 12px;
    border-radius: 12px;
    h3 {
      font-family: Clash Grotesk;
      font-size: 34px;
      line-height: 100%;
      color: var(--white);
    }
  }
}

.cards-container {
  margin-top: 16px;
  margin-bottom: 54px;
  position: relative;
  > h4 {
    font-family: Clash Grotesk;
    font-size: 22px;
    line-height: 100%;
    margin-top: 24px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 12px;
  }
}
</style>
