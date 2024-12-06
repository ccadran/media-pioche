<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {useArticlesStore} from '~/stores/articles';
import { useReadingTimeStore } from '~/stores/readingTime';
import type { Article } from '~/@types/api';
import gsap from 'gsap';

const route = useRoute();

const articlesStore = useArticlesStore();
const readingTimeStore = useReadingTimeStore();


const week = route.params.week;


const articles = ref<Article[]>([]);

const lectureTime = ref(0);


const { data, error } = await useFetch(`/api/articles/${week}`);
if (data.value) {
    articles.value = data.value as Article[];
}

articles.value.forEach(article => {
  console.log(article.theme);
});




const addToStore=(article: Article)=>{    

    articlesStore.addArticle(article);
    console.log('add to store');
    console.log(articlesStore.articles, 'articles in store');
    lectureTime.value += article.lecture_time;
    currentCardIndex.value++;

    gsap.to(`.card[data-index="${currentCardIndex.value-1}"]`, {
            x: 600,
            duration: 1,
            ease: 'power2.out',
            scale: 0.8,
        });
}

const skipArticle=()=>{
    currentCardIndex.value++;
    gsap.to(`.card[data-index="${currentCardIndex.value-1}"]`, {
            x: -600,
            duration: 1,
            ease: 'power2.out',
            scale: 0.8,
        });
}


const removeFromStore=(article: Article)=>{
    console.log('remove from store');
    articlesStore.removeArticle(article.id);
}





const backBtn = () => {
    if (currentCardIndex.value > 0) {
      gsap.to(`.card[data-index="${currentCardIndex.value-1}"]`, {
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
            scale: 1,
        });
        const previousCard = articles.value[currentCardIndex.value - 1];
        const isInStore = articlesStore.articles.some(article => article.id === previousCard.id);
        if (isInStore) {
            removeFromStore(previousCard);
            lectureTime.value -= previousCard.lecture_time;
        }
        currentCardIndex.value--;
    }else{
        navigateTo(`/`)
    }
}

const currentArticle = articlesStore.currentIndex


const currentCard = ref<Article>();
const currentCardIndex = ref(0);
currentCard.value = articles.value[currentCardIndex.value];

watch(currentCardIndex,()=>{
    if (currentCardIndex.value < articles.value.length) {
        currentCard.value = articles.value[currentCardIndex.value];
        console.log(currentCard.value);
    }
    else{
        navigateTo(`/recap/${week}`)
    }
})


const progressWidth = computed(() => {
  const percentage = (lectureTime.value / readingTimeStore.readingTime) * 100;
  return `${Math.min(percentage, 100)}%`; // Limiter à 100%
});


const getBackgroundColor = (theme: string): string => {
  const themeColors: Record<string, string> = {
    justice: 'var(--purple)',
    sport: 'var(--yellow)',
    culture: 'var(--pink)',
    environnement: 'var(--green)',
    autre: 'var(--blue)',
    politique: 'var(--red)',
  };

  return themeColors[theme.toLowerCase()] || 'var(--default-color)';
};



</script>


<template>
    <div class="swipe">
      <div class="navigation">
        <button @click="backBtn()" class="back">
          <img src="/assets/icons/back.svg" alt="">
        </button>
        <div class="title counter">
          <h3>{{ `${currentCardIndex + 1} / ${articles.length}` }}</h3>
        </div>
      </div>
      <div class="cards-container">
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
      :lectureTime="lectureTime"
      :progressWidth="progressWidth"
      :onSkip="skipArticle"
      :onAddToStore="() => addToStore(currentCard!)"
      :read_target="readingTimeStore.readingTime"
    />
    </div>
  </template>


<style lang="scss">
.swipe{
    height: 100svh;
    position: relative;
}
.navigation{
    padding-top: 24px;
    display: flex;
    position: relative;
    align-items: center;
    >.back{
        background-color: var(--black);
        height: 50px;
        width: 50px;
        border-radius: 25px;
        display: flex;
        justify-content: center;
        >img{
            width: 22px;
        }
    }
    >.title{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--black);
        padding: 6px 12px;
        border-radius: 12px;
        h3{
            font-family: Clash Grotesk;
            font-size: 34px;
            line-height: 100%;
            color: var(--white);
        }
    }
}

.cards-container{
    margin-top: 16px;
    margin-bottom: 54px;
    position: relative;
    >h4{
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
