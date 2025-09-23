import { createClient } from '@sanity/client'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const client = createClient({
    projectId: config.public.sanityProjectId,
    dataset: config.public.sanityDataset,
    apiVersion: '2025-08-01',
    useCdn: true,
  })

  return {
    provide: {
      sanityClient: client,
    },
  }
})