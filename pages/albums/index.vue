<template>
  <div class="albums-archive">
    <p v-if="pending" class="state-msg">Chargement…</p>
    <p v-else-if="error" class="state-msg">Erreur : {{ error.message }}</p>
    <template v-else>
      <div class="archive-header">
        <p class="archive-preamble">Disques traversés lentement, parfois laissés ouverts pendant des semaines. Des notes prises dans leur sillage.</p>
        <p v-if="filteredArticles?.length" class="archive-count">{{ filteredArticles.length }} chroniques</p>
      </div>
      <div class="albums-grid">
        <NuxtLink
          v-for="(article, index) in filteredArticles"
          :key="article._id"
          :to="`/albums/${article.slug.current}`"
          class="album-item"
          :class="{ featured: index % 9 === 0, 'is-revealed': revealedId === article._id }"
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
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    if (revealedId.value !== article._id) {
      event.preventDefault()
      revealedId.value = article._id
    }
  }
}
</script>

<style scoped>
.albums-archive {
  padding: 50px 0 80px;
}

.archive-header {
  padding: 0 20px;
  margin-bottom: 44px;
}

.archive-preamble {
  max-width: 420px;
  font-family: "Fira Sans", sans-serif;
  font-style: italic;
  font-weight: 300;
  font-size: 0.9rem;
  line-height: 1.75;
  color: #777;
  margin-bottom: 16px;
}

.archive-count {
  font-family: "Fira Sans", sans-serif;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #bbb;
}

/* === Grille === */
.albums-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  grid-auto-flow: dense;
}

/* === Items === */
.album-item {
  position: relative;
  overflow: hidden;
  display: block;
  cursor: pointer;
  aspect-ratio: 1;
}

/*
  Un item sur 9 passe en 2×2.
  Même rapport carré — la pochette n'est pas croppée, juste plus grande.
  Cycle de 9 : 1 featured (4 cellules) + 8 small (8 cellules) = 12 cellules = 3 rangées de 4. ✓
*/
.album-item.featured {
  grid-column: span 2;
  grid-row: span 2;
}

/* === Image === */
.album-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  filter: brightness(1.0) saturate(0.9);
  transition: filter 0.65s ease, transform 0.55s ease;
}

/* === Grain subtil au hover === */
.album-item::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 700'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='5' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  background-size: cover;
  mix-blend-mode: overlay;
  transition: opacity 0.55s ease;
}

/* === Overlay info === */
.album-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 44px 12px 12px;
  background: linear-gradient(to top, rgba(5, 3, 2, 0.7) 0%, rgba(5, 3, 2, 0.08) 60%, transparent 100%);
  opacity: 0;
  transition: opacity 0.6s ease;
}

/* === Hover desktop === */
.album-item:hover .album-cover-img,
.album-item.is-revealed .album-cover-img {
  filter: brightness(0.88) saturate(0.55) contrast(1.04);
  transform: scale(1.02);
}

.album-item:hover::after,
.album-item.is-revealed::after {
  opacity: 0.28;
}

.album-item:hover .album-info,
.album-item.is-revealed .album-info {
  opacity: 1;
}

/* === Typographie overlay === */
.album-info-title {
  font-family: "DM Serif Text", serif;
  font-style: italic;
  font-size: 0.85rem;
  line-height: 1.25;
  color: rgba(244, 240, 232, 0.96);
}

.album-item.featured .album-info-title {
  font-size: 1.05rem;
}

.album-info-artist {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.7rem;
  font-weight: 300;
  color: rgba(210, 205, 195, 0.6);
  margin-top: 4px;
  letter-spacing: 0.02em;
}

.state-msg {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.9rem;
  color: #999;
  font-style: italic;
  padding: 20px;
}

/* Responsive */
@media (max-width: 900px) {
  .albums-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
}

@media (max-width: 600px) {
  .albums-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  }
  .album-item.featured {
    grid-column: span 1;
    grid-row: span 1;
  }
}
</style>
