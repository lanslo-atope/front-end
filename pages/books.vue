<template>
  <div class="articles-grid">
    <p v-if="pending">Chargement...</p>
    <p v-else-if="error">Erreur : {{ error.message }}</p>
    <div
      v-else
      v-for="article in data"
      :key="article._id"
      class="article"
    >
      <img :src="article.image" :alt="article.title" />
      <h2>{{ article.title }}</h2>
      <p>{{ article.date }}</p>
    </div>
  </div>
</template>

<script setup>
import { useSanity } from '~/composables/useSanity'

const client = useSanity()

const { data, pending, error } = await useAsyncData('books', () =>
  client.fetch(`
    *[_type == "article" && category == "books"]{
      _id,
      title,
      stitle,
      date,
      slug,
      "image": image.asset->url
    } | order(date desc)
  `)
)
</script>

<style scoped>
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.article {
  border: 1px solid #ccc;
  padding: 10px;
}

.article img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
