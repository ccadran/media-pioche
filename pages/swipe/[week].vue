<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {useArticlesStore} from '~/stores/articles';

const route = useRoute();

const articlesStore = useArticlesStore();


const week = route.params.week; 

console.log(week);


const articles = ref([]);

const { data, error } = await useFetch(`/api/articles/${week}`);

watch(articlesStore.articles,()=>{
    console.log(articlesStore.articles[0].id,'test');
})


const addToStore=(article)=>{
    console.log(article);
    articlesStore.addArticle(article);
    console.log('add to store');
    console.log(articlesStore.articles);
}

const removeFromStore=(article)=>{
    console.log('remove from store');
    articlesStore.removeArticle(article.id);
    console.log(articlesStore.articles);
}

const currentArticle = articlesStore.currentIndex

articles.value = data.value;

console.log(articles.value);
</script>


<template>
    <div>
        <h1>Articles</h1>
        <ul>
        <li v-for="article in articles" :key="article.id">
            <p>{{ article.title }}</p>
            <p @click="addToStore(article)">Ajouter au store</p>
            <p @click="removeFromStore(article)">supprimer du store</p>
        </li>
        </ul>
    </div>
    <NuxtLink :to="`/articles/${articlesStore.articles[currentArticle]?.id}`">
  YOOO premier article
</NuxtLink>
</template>
