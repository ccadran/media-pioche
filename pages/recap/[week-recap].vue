<script lang="ts" setup>
import {useArticlesStore} from '~/stores/articles';
import type { Article } from '~/@types/api';

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
const currentArticle = articlesStore.currentIndex


const isArticleInStore = (article: Article) => {
    return articlesStore.articles.some((storeArticle) => storeArticle.id === article.id);
};






console.log(articlesStore.articles)
</script>

<template>
    <div class="recap">
        <div class="navigation">
            <NuxtLink :to="`/swipe/${week}`" class="back">
                    <img src="/assets/icons/back.svg" alt="">
            </NuxtLink>
            <div class="title">
                <h3>RÉCAP</h3>
            </div>
        </div>
        <h4>Sur de ton choix ?</h4>
        <div class="recap-cards-container">
            <NuxtLink class="card" v-for="article in articles" :class="{ 'in-store': isArticleInStore(article) }" 
            @click="isArticleInStore(article)? removeArticleFromStore(article) : addArticleToStore(article)" >
                <img :src="article.cover" alt="" class="cover">
                <div class="toggle-btn">
                    <img v-if="isArticleInStore(article)" src="/assets/icons/add.svg" alt="" class="add">
                    <img v-if="!isArticleInStore(article)" src="/assets/icons/minus.svg" alt="remove">
                </div>
            </NuxtLink>
        </div>
        <div class="confirmation">
            <div class="confirmation-info">
                <p>5 articles séléctionnés</p>
                <p>7min de lectures</p>
            </div>
            <NuxtLink :to="`/articles/${articlesStore.articles[currentArticle]?.id}`" class="confirmation-btn">
                <h3>Commencer la lecture !</h3>
            </NuxtLink>
        </div>
    </div>
</template>

<style lang="scss">

.recap{
    >h4{
        font-family: Clash Grotesk;
        font-weight: 500;
        font-size: 22px;
        text-align: center;
        margin-top: 64px;
        margin-bottom: 42px;
    }
    >.recap-cards-container{
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 18px;
        row-gap: 34px;
        >.card{
            background-color: green;
            height: 104px;
            border-radius: 8px;
            position: relative;
            >.cover{
                border-radius: 8px;
                width: 100%;
                height: 100%;
                object-fit: cover;
        }
        >.toggle-btn{
            position: absolute;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: black;
            border-radius: 50%;
            top: -15px;
            left: -10px;
            >img{
                width: 15px;
                height: 15px;
                
            }
        }
        &.in-store{
            filter: grayscale(1);
        }
    }
    }
    >.confirmation{
        height: 15svh;
        width: 100%;
        left: 0;
        background-color: rgba(128, 128, 128, 0.543);
        position: absolute;
        bottom: 0;
        padding: 22px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 24px 24px 0px 0px;
        >.confirmation-info{
            display: flex;
            justify-content: space-between;
            >p{
                font-family: Satoshi;
                font-size: 14px;
                line-height: 100%;
                color: black;
            }
        }
        >.confirmation-btn{
            width: 100%;
            background-color: black;
            padding: 12px;
            display: flex;
            justify-content: center;
            color: white;
            border-radius: 12px;
            >h3{
                text-align: center;
                font-family: Clash Grotesk;
                font-size: 22px;
                font-weight: 700;

            }
        }
    }
}
</style>