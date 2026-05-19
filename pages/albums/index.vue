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
          :class="[getSizeClass(index), { 'is-revealed': revealedId === article._id }]"
          @click="handleClick($event, article)"
        >
          <img :src="article.image" :alt="article.title" class="album-cover-img" />
          <div class="album-info">
            <div class="album-info-title">{{ article.title }}</div>
            <div class="album-info-sub">
              <span v-if="article.stitle">{{ article.stitle }}</span>
              <template v-if="article.labelAndRelease">
                <span class="sep" v-if="article.stitle || article.labelAndRelease.label"> · </span>
                <span v-if="article.labelAndRelease.label">{{ article.labelAndRelease.label }}</span>
                <span class="sep" v-if="article.labelAndRelease.releaseYear"> · </span>
                <span v-if="article.labelAndRelease.releaseYear">{{ formatYear(article.labelAndRelease.releaseYear) }}</span>
              </template>
            </div>
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
    labelAndRelease,
    "image": image.asset->url
  } | order(date desc)
`

const { data: filteredArticles, pending, error } = await useAsyncData('articles', () =>
  client.fetch(query)
)

// Cycle de 10 items qui remplit exactement 4 colonnes sans trou :
// Rangée 1 : wide(2) + small + small = 4
// Rangée 2 : small + small + small + tall(rows 2-3) = 4
// Rangée 3 : wide(2) + small + tall(cont.) = 4
// Rangée 4 : wide(2) + wide(2 du cycle suivant) = 4
const sizePattern = ['wide', 'small', 'small', 'small', 'small', 'small', 'tall', 'wide', 'small', 'wide']

function getSizeClass(index) {
  return sizePattern[index % sizePattern.length]
}

const revealedId = ref(null)

function handleClick(event, article) {
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    if (revealedId.value !== article._id) {
      event.preventDefault()
      revealedId.value = article._id
    }
  }
}

function formatYear(dateString) {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('fr-FR', { year: 'numeric' }).format(new Date(dateString))
}
</script>

<style scoped>
.albums-archive {
  padding: 50px 0 80px;
}

.archive-header {
  padding: 0 20px;
  margin-bottom: 40px;
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

/* === Grille mosaïque pleine largeur === */
.albums-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 220px;
  gap: 3px;
  grid-auto-flow: dense;
}

.small {
  grid-column: span 1;
  grid-row: span 1;
}

.wide {
  grid-column: span 2;
  grid-row: span 1;
}

.tall {
  grid-column: span 1;
  grid-row: span 2;
}

/* === Item === */
.album-item {
  position: relative;
  overflow: hidden;
  display: block;
  cursor: pointer;
}

.album-item::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 700'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='5' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  background-size: cover;
  mix-blend-mode: overlay;
  transition: opacity 0.5s ease;
}

.album-item:hover::after,
.album-item.is-revealed::after {
  opacity: 0.3;
}

/* === Image === */
.album-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  filter: brightness(1.0) saturate(0.92);
  transition: filter 0.6s ease, transform 0.5s ease;
}

.album-item:hover .album-cover-img,
.album-item.is-revealed .album-cover-img {
  filter: brightness(0.85) saturate(0.6) contrast(1.05);
  transform: scale(1.03);
}

/* === Overlay info === */
.album-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 48px 13px 13px;
  background: linear-gradient(to top, rgba(6, 4, 2, 0.75) 0%, rgba(6, 4, 2, 0.18) 55%, transparent 100%);
  opacity: 0;
  transition: opacity 0.55s ease;
}

.album-item:hover .album-info,
.album-item.is-revealed .album-info {
  opacity: 1;
}

.album-info-title {
  font-family: "DM Serif Text", serif;
  font-style: italic;
  font-size: 0.88rem;
  line-height: 1.25;
  color: rgba(245, 240, 232, 0.96);
}

.wide .album-info-title {
  font-size: 1.0rem;
}

.album-info-sub {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.68rem;
  font-weight: 300;
  color: rgba(210, 205, 195, 0.62);
  margin-top: 4px;
  letter-spacing: 0.02em;
}

.sep {
  opacity: 0.45;
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
    grid-auto-rows: 180px;
  }
  .wide {
    grid-column: span 2;
  }
}

@media (max-width: 600px) {
  .albums-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 44vw;
    gap: 2px;
  }
  .wide {
    grid-column: span 2;
    grid-row: span 1;
  }
  .tall {
    grid-column: span 1;
    grid-row: span 1;
  }
}
</style>
