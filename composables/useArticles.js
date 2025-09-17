import { createClient } from "@sanity/client"

export const client = createClient({
  projectId: "w6f4ec13",   // trouve ça dans manage.sanity.io
  dataset: "production",         // ou le nom de ton dataset
  apiVersion: "2025-08-01",      // choisis une date récente
  useCdn: true,                  // true = plus rapide (cache), false = données fraîches
})

export const useArticles = async () => {
  try {
    const articles = await client.fetch(`
      *[_type == "article"]{
        _id,
        title,
        stitle,
        date,
        "image": image.asset->url,
        content,
        category
      } | order(date desc)
    `)
    
    return articles
  } catch (error) {
    console.error('Error fetching articles from Sanity:', error)
    return []
  }
}
