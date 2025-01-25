<script lang="ts" setup>
import { useReadingTimeStore } from '~/stores/readingTime';

const readingTimeStore = useReadingTimeStore();
console.log(readingTimeStore.readingTime);

const setReadingTime = (time: number) => {
    readingTimeStore.setReadingTime(time);
}
watch(() => readingTimeStore.readingTime, (newValue) => {
    console.log(newValue);
});

const objectifs = [5, 10, 15];

const completeOnboarding = (time: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days expiration
    document.cookie = `onboardingCompleted=true; expires=${expires.toUTCString()}; path=/`;
    document.cookie = `readingTime=${time}; expires=${expires.toUTCString()}; path=/`;

    readingTimeStore.setReadingTime(time);
};



</script>

<template>
    <div class="objectifs">
        <img src="/assets/icons/logo.svg" alt="" class="logo">
        <h4>Défini ton objectif de lecture par semaine</h4>
        <div class="objectifs-reading">
            <!-- <div
            v-for="objectif in objectifs"
            :key="objectif"
            @click="setReadingTime(objectif)"
            :class="['objectif', { active: readingTimeStore.readingTime === objectif }]"
            >
                <p>
                    {{ objectif }}min
                </p>
            </div> -->
            <div
            v-for="objectif in objectifs"
            :key="objectif"
            @click="completeOnboarding(objectif)"
            :class="['objectif', { active: readingTimeStore.readingTime === objectif }]"
            >
                <p>
                    {{ objectif }}min
                </p>
            </div>
        </div>
        <h4>Pas d’inquiétudes, ça ne te limitera / te forcera à rien !</h4>
        <NuxtLink
            to="/onboarding/ready"
            class="btn-onboarding"
            :class="{ disabled: readingTimeStore.readingTime === 0 }"
            :aria-disabled="readingTimeStore.readingTime === 0"
        >
        <h3>Continuer</h3>
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

    >.objectifs-reading{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        justify-content: center;
        >.objectif {
            cursor: pointer;
            transition: all 0.3s ease;
            height: 50px;
            background-color: var(--black);
            opacity: 0.5;
            color: var(--white);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            width: 50%;
            >p{
                font-family: Clash Grotesk;
                font-size: 22px;
                font-weight: 700;
            }

    &.active {
        opacity: 1;
    }
}
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
        &.disabled {
            opacity: 0.8;

        cursor: not-allowed;
        pointer-events: none;
    }
    }
}
</style>