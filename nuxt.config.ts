import { isBrowser } from "@supabase/ssr";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@pinia/nuxt", "@nuxthub/core"],
  css: ["~/assets/styles/index.scss"],
  supabase: {
    redirect: false,
    redirectOptions: {
      login: "/",
      callback: "/admin",
      include: undefined,
      exclude: [],
      cookieRedirect: false,
    },
    clientOptions: {
      auth: {
        flowType: "pkce", // Recommended for modern, secure authentication flows
        autoRefreshToken: isBrowser(), // Automatically refresh tokens in the browser
        detectSessionInUrl: isBrowser(), // Detect session changes in the browser URL
        persistSession: true, // Enable session persistence
      },
    },
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});