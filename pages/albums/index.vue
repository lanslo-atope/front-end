<template>
  <div class="albums-archive">
    <p v-if="pending" class="state-msg">Chargement…</p>
    <p v-else-if="error" class="state-msg">Erreur : {{ error.message }}</p>
    <template v-else>
      <p v-if="filteredArticles?.length" class="archive-count">
        {{ filteredArticles.length }} chroniques
      </p>
      <div class="albums-grid">
        <NuxtLink
          v-for="(article, index) in filteredArticles"
          :key="article._id"
          :to="`/albums/${article.slug.current}`"
          :class="['album-item', { 'album-item--featured': index === 0 }]"
        >
          <div class="album-cover-wrapper">
            <img :src="article.image" :alt="article.title" class="album-cover-img" />
            <div class="grain"></div>
          </div>
          <div class="album-info">
            <div class="album-info-title">{{ article.title }}</div>
            <div class="album-info-artist" v-if="article.stitle">{{ article.stitle }}</div>
            <div class="album-info-date" v-if="article.date">{{ formatDate(article.date) }}</div>
          </div>
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useSanity } from '~/composables/useSanity'

const client = useSanity()

const query = `
  *[_type == "article" && category == "albums"]{
    _id,
    title,
    stitle,
    slug,
    date,
    "image": image.asset->url
  } | order(date desc)
`

const { data: filteredArticles, pending, error } = await useAsyncData('articles', () =>
  client.fetch(query)
)

function formatDate(dateString) {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('fr-FR', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}
</script>

<style scoped>
.albums-archive {
  padding: 50px 20px 80px;
}

.archive-count {
  font-family: "Fira Sans", sans-serif;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #bbb;
  margin-bottom: 30px;
}

.albums-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px 28px;
}

.album-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

/* Premier article mis en avant */
.album-item--featured {
  grid-column: span 2;
}

.album-item--featured .album-info-title {
  font-size: 1.2rem;
}

/* === Image === */
.album-cover-wrapper {
  position: relative;
  overflow: hidden;
}

.album-cover-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  filter: brightness(1.05) contrast(0.95);
  transition: filter 0.5s ease, transform 0.4s ease;
}

/* === Grain === */
.grain {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 700'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='5' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)' /></svg>");
  background-size: cover;
  mix-blend-mode: overlay;
  transition: opacity 0.4s ease;
}

/* === Hover === */
.album-item:hover .album-cover-img {
  filter: brightness(1.12) contrast(1.05) saturate(0.75);
  transform: scale(1.02);
}

.album-item:hover .grain {
  opacity: 0.55;
}

/* === Texte === */
.album-info {
  padding: 10px 0 0;
  margin-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.album-info-title {
  font-family: "DM Serif Text", serif;
  font-style: italic;
  font-size: 1rem;
  line-height: 1.25;
  color: #222;
  transition: color 0.2s ease;
}

.album-item:hover .album-info-title {
  color: #e8695f;
}

.album-info-artist {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.82rem;
  font-weight: 300;
  color: #777;
  margin-top: 4px;
}

.album-info-date {
  font-family: "Fira Sans", sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: #bbb;
  margin-top: 5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.state-msg {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.9rem;
  color: #999;
  font-style: italic;
  padding: 20px 0;
}

/* Responsive */
@media (max-width: 700px) {
  .albums-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .album-item--featured {
    grid-column: span 2;
  }
}

@media (max-width: 420px) {
  .albums-grid {
    grid-template-columns: 1fr;
  }
  .album-item--featured {
    grid-column: span 1;
  }
}
</style>
