<script lang="ts" setup>
import { ref } from 'vue';
const { data } = await useFetch('/api/week') 

const weeks = ref(data.value)

</script>

<template>
    <div>
        <h1>Admin</h1>
        <h2>Semaines</h2>
        <ul>
            <li v-for="week in weeks" :key="week.id">
                <nuxt-link :to="`/admin/${week.id}`">{{ week.date }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss">

</style>