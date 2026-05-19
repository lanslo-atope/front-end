<template>
  <div class="albums-archive">
    <p v-if="pending" class="state-msg">Chargement…</p>
    <p v-else-if="error" class="state-msg">Erreur : {{ error.message }}</p>
    <template v-else>
      <p class="archive-preamble">Disques traversés lentement, parfois laissés ouverts pendant des semaines. Des notes prises dans leur sillage.</p>
      <p v-if="filteredArticles?.length" class="archive-count">
        {{ filteredArticles.length }} chroniques
      </p>
      <div class="albums-grid">
        <NuxtLink
          v-for="article in filteredArticles"
          :key="article._id"
          :to="`/albums/${article.slug.current}`"
          class="album-item"
          :class="{ 'is-revealed': revealedId === article._id }"
          @click="handleClick($event, article)"
        >
          <img :src="article.image" :alt="article.title" class="album-cover-img" />
          <div class="album-info">
            <div class="album-info-title">{{ article.title }}</div>
            <div class="album-info-artist" v-if="article.stitle">{{ article.stitle }}</div>
          </div>
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSanity } from '~/composables/useSanity'

const client = useSanity()

const query = `
  *[_type == "article" && category == "albums"]{
    _id,
    title,
    stitle,
    slug,
    "image": image.asset->url
  } | order(date desc)
`

const { data: filteredArticles, pending, error } = await useAsyncData('articles', () =>
  client.fetch(query)
)

const revealedId = ref(null)

function handleClick(event, article) {
  if (globalThis.window !== undefined && globalThis.window.matchMedia('(hover: none)').matches) {
    if (revealedId.value !== article._id) {
      event.preventDefault()
      revealedId.value = article._id
    }
  }
}
</script>

<style scoped>
.albums-archive {
  padding: 40px 20px 80px;
}

.archive-preamble {
  max-width: 420px;
  font-family: "Fira Sans", sans-serif;
  font-style: italic;
  font-weight: 300;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-bottom: 20px;
}

.archive-count {
  font-family: "Fira Sans", sans-serif;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-ghost);
  margin-bottom: 24px;
}

/* === Grille === */
.albums-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}

.album-item {
  position: relative;
  overflow: hidden;
  display: block;
  cursor: pointer;
  aspect-ratio: 1;
}

/* === Image === */
.album-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: filter 0.5s ease, transform 0.5s ease;
}

/* === Overlay info === */
.album-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 36px 10px 10px;
  background: linear-gradient(to top, rgba(5, 3, 2, 0.72) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

/* === Hover desktop === */
.album-item:hover .album-cover-img,
.album-item.is-revealed .album-cover-img {
  filter: brightness(0.88) saturate(0.6);
  transform: scale(1.02);
}

.album-item:hover .album-info,
.album-item.is-revealed .album-info {
  opacity: 1;
}

/* === Typographie overlay === */
.album-info-title {
  font-family: "DM Serif Text", serif;
  font-style: italic;
  font-size: 0.8rem;
  line-height: 1.2;
  color: rgba(244, 240, 232, 0.96);
}

.album-info-artist {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.65rem;
  font-weight: 300;
  color: rgba(210, 205, 195, 0.62);
  margin-top: 3px;
}

.state-msg {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.9rem;
  color: #999;
  font-style: italic;
  padding: 20px 0;
}

/* Responsive */
@media (max-width: 1000px) {
  .albums-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 500px) {
  .albums-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
  }
}
</style>
