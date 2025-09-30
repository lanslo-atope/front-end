export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  pages: true, // Assure que Nuxt utilise le système de pages
  app: {
    head: {
      title: 'Te voilà bien consumé',
      meta: [
        { name: 'description', content: 'Description de mon site' },
      ],
      link: [
        { rel: 'stylesheet', href:"https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" }
      ]
    }
  },
  runtimeConfig: {
    public: {
      sanityProjectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID,
      sanityDataset: process.env.NUXT_PUBLIC_SANITY_DATASET,
      sanityApiVersion: process.env.NUXT_PUBLIC_SANITY_API_VERSION,
      useCdn: true,
    }
  }
})