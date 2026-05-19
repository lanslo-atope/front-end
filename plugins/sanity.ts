import { createClient } from '@sanity/client'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const client = createClient({
    projectId: config.public.sanityProjectId,
    dataset: config.public.sanityDataset,
    apiVersion: config.public.sanityApiVersion as string,
    useCdn: config.public.useCdn as boolean,
  })

  return {
    provide: {
      sanityClient: client,
    },
  }
})