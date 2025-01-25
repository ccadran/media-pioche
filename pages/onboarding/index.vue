<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const showModal = ref(false);
const modalMessage = ref('');

const detectDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/mobile|android|iphone|ipad|ipod/.test(userAgent)) {
        // Mobile Device
        modalMessage.value = `
            Pour améliorer votre expérience, ajoutez-le à votre écran d'accueil. 
            Appuyez sur l'icône de partage et sélectionnez "Ajouter à l'écran d'accueil".
        `;
        showModal.value = true;
    } else {
        // Desktop Device
        modalMessage.value = `
            Ce site n'est pas optimisé pour une utilisation sur ordinateur. 
            Veuillez utiliser un smartphone pour une meilleure expérience.
        `;
        showModal.value = true;
    }
};

onMounted(() => {
    detectDevice();
});

const closeModal = () => {
    showModal.value = false;
};

</script>

<template>
    <div class="themes">
        <img src="/assets/icons/logo.svg" alt="" class="logo">
        <h4>Retrouves tes infos de la semaine à travers différentes thématiques</h4>
        <video 
            src="/assets/videos/THEMES.mp4" 
            class="themes-video"
            autoplay 
            muted
            playsinline
        ></video>
        <NuxtLink to="/onboarding/swipe" class="btn-onboarding" >
            <h3>Ok !</h3>
        </NuxtLink>

        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <p>{{ modalMessage }}</p>
                <div class="close-btn-container">
                    <button @click="closeModal" class="close-btn">Got it!</button>
                </div>
            </div>
        </div>
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
    .themes-video{
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

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

.modal-content {
    background: var(--white);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    max-width: 90vw;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-content p {
    font-family: Clash Grotesk;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
}

.close-btn-container {
    display: flex;
    justify-content: center;
    width: 100%;
}

.close-btn {
    background-color: var(--black);
    color: var(--white);
    padding: 10px 20px;
    font-family: Clash Grotesk;
    font-size: 16px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
}

</style>