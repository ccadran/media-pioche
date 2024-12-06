<script lang="ts" setup>

</script>

<template>
    <div class="themes">
        <img src="/assets/icons/logo.svg" alt="" class="logo">
        <h4>Retrouves tes infos de la semaine à travers différentes thématiques</h4>
        <div class="video-container">

            <video 
            src="/assets/videos/THEMES.mp4" 
            class="themes-video"
            autoplay 
            muted
            ></video>
        </div>
        <NuxtLink to="/onboarding/swipe" class="btn-onboarding" >
            <h3>Ok !</h3>
        </NuxtLink>

        
    </div>
</template>

<style lang="scss">
.themes{
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
    .video-container{
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