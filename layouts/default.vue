<template>
    <main>
        <div id="overlay" class="overlay"></div>
        <slot />
    </main>
</template>

<script setup>


</script>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    top: -100%; /* Start offscreen */
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8); /* Dark overlay color */
    z-index: 1000; /* Ensure it covers the page */
    transition: top 0.8s ease-in-out;
}
</style>