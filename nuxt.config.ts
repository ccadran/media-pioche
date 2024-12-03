// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@pinia/nuxt"],
  css: ["~/assets/styles/index.scss"],
  supabase: {
    redirect: false,
  },
});
