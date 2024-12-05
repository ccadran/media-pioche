<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {useArticlesStore} from '~/stores/articles';
import type { Article } from '~/@types/api';

const route = useRoute();

const articlesStore = useArticlesStore();


const week = route.params.week;


const articles = ref<Article[]>([]);

const lectureTime = ref(0);


const { data, error } = await useFetch(`/api/articles/${week}`);
if (data.value) {
    articles.value = data.value as Article[];
}



const addToStore=(article: Article)=>{    

    articlesStore.addArticle(article);
    console.log('add to store');
    console.log(articlesStore.articles, 'articles in store');
    lectureTime.value += article.lecture_time;
    currentCardIndex.value++;
}

const skipArticle=()=>{
    currentCardIndex.value++;
}


const removeFromStore=(article: Article)=>{
    console.log('remove from store');
    articlesStore.removeArticle(article.id);
}



const backBtn = () => {

    if (currentCardIndex.value > 0) {
        const previousCard = articles.value[currentCardIndex.value - 1];
        const isInStore = articlesStore.articles.some(article => article.id === previousCard.id);
        if (isInStore) {
            removeFromStore(previousCard);
            lectureTime.value -= previousCard.lecture_time;
        }
        currentCardIndex.value--;
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
  const percentage = (lectureTime.value / 15) * 100;
  return `${Math.min(percentage, 100)}%`; // Limiter à 100%
});



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
        <div class="card" v-for="(card, index) in articles" :key="card.id" :class="{ 'hidden': index < currentCardIndex }">
            <div class="img-container">
                <img :src="card.cover" alt="" class="inner">
            </div>
            <div class="card-text">
                <h4>{{ card.title }}</h4>
                <p>{{ card.accroche }}</p>
            </div>
        </div>
    </div>
    <div class="choices">
        <button @click="skipArticle()" class="denied">
            <img src="/assets/icons/cross.svg" alt="">
        </button>
        <div class="lecture-time">
            <p>{{ `${lectureTime}/15min` }}</p>
            <div class="time-progress">
                <div class="progress" :style="{ width: progressWidth }" ></div>
            </div>
        </div>
        <button @click="addToStore(currentCard!)" class="check">
            <img src="/assets/icons/check.svg" alt="">
        </button>
    </div>
    <NuxtLink :to="`/articles/${articlesStore.articles[currentArticle]?.id}`">
     YOOO premier article
    </NuxtLink>
</div>
</template>


<style lang="scss">
.swipe{
    height: 100vh;
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
    >.card{
        height: 412px;
        background-color: #34DF77;
        border-radius: 12px;
        padding: 6px 12px 24px;
        >.img-container{
            max-height: 240px;
            height: 60%;
            >.inner{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        >.card-text{
            margin-top: 22px;
            height: 40%;
            h4{
                margin-bottom: 12px;
                font-family: Satoshi;
                font-weight: 700;
                font-size: 18px;
                line-height: 100%;
            }
            p{
                font-family: Satoshi;
                font-size: 16px;
                font-weight: 400;
            }
        }
        &.hidden{
            display: none;
        }
        }
    }



.choices{
    display: flex;
    position: absolute;
    bottom: 54px;
    justify-content: space-between;
    width: 100%;
    >.denied{
        background-color: var(--black);
        height: 65px;
        width: 65px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        >img{
            width: 22px;
        }
    }
    >.lecture-time{
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
            font-family: Clash Grotesk;
            font-size: 16px;
            font-weight: 500;
        }
        >.time-progress{
            background-color: var(--black);
            height: 8px;
            border-radius: 4px;
            margin-top: 8px;
            width: 168px;
            >.progress{
                background-color: var(--white);
                height: 100%;
                width: 50%;
                border-radius: 4px;
            }
        }
    }


    >.check{
        background-color: var(--black);
        height: 65px;
        width: 65px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        >img{
            width: 30px;
        }
    }
}
</style>
