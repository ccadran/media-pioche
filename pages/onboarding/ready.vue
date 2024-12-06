<script lang="ts" setup>

</script>

<template>
    <div class="ready">
        <img src="/assets/icons/logo.svg" alt="" class="logo">
        <div class="text">
            <h4>Tu as désormais toutes les cartes en main !</h4>
            <h4>Bonne lecture !</h4>
        </div>
        <NuxtLink to="/" class="btn-onboarding" >
            <h3>Je suis prêt !</h3>
        </NuxtLink>

        
    </div>
</template>

<style lang="scss">
.ready{
    height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 22px 0;
    >.logo{
        width: 32px;
    }
    >.text{
        display: flex;
        flex-direction: column;
        gap: 44px;
        >h4{
            font-family: Clash Grotesk;
            font-weight: 500;
            font-size: 22px;
            text-align: center;
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
    }
}
</style>