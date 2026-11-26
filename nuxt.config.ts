import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · NTC Reviewer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0a141f' },
        {
          name: 'description',
          content:
            'Free Philippine amateur radio reviewer and timed mock exam for NTC Class D and Class C licenses. Study Elements 2, 3, and 4, then test yourself and download your result as a PDF.',
        },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' },
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/reviewer',
        '/reviewer/element-2',
        '/reviewer/element-3',
        '/reviewer/element-4',
        '/exam',
        '/exam/take',
        '/exam/result',
        '/sources',
      ],
    },
  },
})
