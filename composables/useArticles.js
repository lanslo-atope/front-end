// composables/useArticles.ts
export const useArticles = () => {
  const client = useSanity()

  return useAsyncData('articles', async () => {
    try {
      return await client.fetch(`
        *[_type == "article"]{
          _id,
          title,
          stitle,
          "labelNameReleaseDate": 
            labelAndRelease.label + " - " + string(dateTime(labelAndRelease.releaseYear)[0..3]),
          date,
          "authorName": author->name,
          slug,
          "image": image.asset->url,
          content,
          category
        } | order(date desc)
      `)
    } catch (error) {
      console.error('Error fetching articles:', error)
      return []
    }
  })
}
