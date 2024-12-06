<script lang="ts" setup>

</script>

<template>
    <div class="objectifs">
        <img src="/assets/icons/logo.svg" alt="" class="logo">
        <h4>Swipe à droite les actus que tu souhaites lire</h4>
        <h4>Et à gauche si ça ne t’intéresse pas.</h4>
        <video src="" class="objectifs-video"></video>
        <NuxtLink to="/onboarding/objectifs" class="btn-onboarding" >
            <h3>J'ai compris !</h3>
        </NuxtLink>

        
    </div>
</template>

<style lang="scss">
.objectifs{
    height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 22px 0;
    >.logo{
        width: 32px;
    }
    >h4{
        font-family: Clash Grotesk;
        font-weight: 500;
        font-size: 22px;
        text-align: center;
    }
    .objectifs-video{
        height: 70svh;
    }

    >.btn-onboarding{
        width: 100%;
        background-color: var(--black);
        padding: 12px;
        display: flex;
        justify-content: center;
        color: var(--white);
        border-radius: 12px;
        >h3{
            text-align: center;
            font-family: Clash Grotesk;
            font-size: 22px;
            font-weight: 700;
        }
    }
}
</style>