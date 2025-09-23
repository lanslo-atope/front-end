export const useAlbums = async () => {
  
  const { $sanityClient } = useNuxtApp()
  
  try {
    const albums = await $sanityClient.fetch(`
      *[_type == "article" && category == "albums"]{
        _id,
        title,
        stitle,
        date,
        slug,
        "image": image.asset->url,
        content,
        category
      } | order(date desc)
    `)
  
    return albums
  } catch (error) {
    console.error('Error fetching albums from Sanity:', error)
    return []
  }
}