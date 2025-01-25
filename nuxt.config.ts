import { isBrowser } from "@supabase/ssr";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@nuxtjs/supabase", "@pinia/nuxt", "@nuxthub/core", "@vite-pwa/nuxt"],
  css: ["~/assets/styles/index.scss"],
  /* vite: {
    resolve: {
      alias: {
        '#build': '/.nuxt'
      }
    }
  }, */
  pwa: {
    manifest: {
      name: "Media Pioche",
      short_name: "Pioche",
      description: "Chaque semaine, explorez l'actualité à votre rythme ! Swipez à droite pour les articles qui vous intéressent, à gauche pour ceux que vous laissez de côté. Votre sélection, votre information.",
      icons: [
        {
          src: "/icons/64x64.png",
          sizes: "64x64",
          type: "image/png"
        },
        {
          src: "/icons/144x144.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "/icons/192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/icons/512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      screenshots: [
        {
          src: "/screenshots/screenshot-desktop.png",
          sizes: "1280x720",
          type: "image/png",
          form_factor: "wide" // For desktop
        },
        {
          src: "/screenshots/screenshot-mobile.png",
          sizes: "375x667",
          type: "image/png",
          form_factor: "narrow" // For mobile
        }
      ]
    },
    workbox: {
      navigateFallback: "/onboarding",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
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