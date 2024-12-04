<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
    middleware: ["auth"]
})

const route = useRoute();



const week = route.params.week; 

console.log(week);


const articles = ref([]);

const { data, error } = await useFetch(`/api/articles/${week}`);

articles.value = data.value;

console.log(articles.value);
</script>


<template>
    <div>
        <h1>Admin</h1>
        <h2>Articles</h2>
        <ul>
        <li v-for="article in articles" :key="article.id">
            <nuxt-link :to="`/article/${article.id}`">{{ article.title }}</nuxt-link>
        </li>
        </ul>
    </div>
</template>
