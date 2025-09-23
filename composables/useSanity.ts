// composables/useSanity.ts
export const useSanity = () => {
  const { $sanityClient } = useNuxtApp()
  return $sanityClient
}