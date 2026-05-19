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
          <div class="album-cover-wrapper">
            <img :src="article.image" :alt="article.title" class="album-cover-img" />
            <div class="grain"></div>
            <div class="album-info">
              <div class="album-info-title">{{ article.title }}</div>
              <div class="album-info-artist" v-if="article.stitle">{{ article.stitle }}</div>
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
  padding: 50px 20px 80px;
}

.archive-preamble {
  max-width: 420px;
  font-family: "Fira Sans", sans-serif;
  font-style: italic;
  font-weight: 300;
  font-size: 0.9rem;
  line-height: 1.75;
  color: #777;
  margin-bottom: 60px;
}

.archive-count {
  font-family: "Fira Sans", sans-serif;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #bbb;
  margin-bottom: 35px;
}

/* Grille organique — 5 colonnes, remplissage dense */
.albums-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  grid-auto-flow: dense;
  align-items: start;
}

.album-item {
  display: block;
  cursor: pointer;
}

.album-item:nth-child(9n+1),
.album-item:nth-child(9n+6) {
  grid-column: span 2;
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
  filter: brightness(1.02) contrast(0.97);
  transition: filter 0.6s ease, transform 0.5s ease;
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
  transition: opacity 0.5s ease;
}

/* === Voile + texte superposé === */
.album-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px 12px 12px;
  background: linear-gradient(to top, rgba(10, 8, 6, 0.62) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.55s ease;
}

/* === Hover desktop === */
.album-item:hover .album-cover-img {
  filter: brightness(0.9) contrast(1.05) saturate(0.7);
  transform: scale(1.025);
}

.album-item:hover .grain {
  opacity: 0.45;
}

.album-item:hover .album-info {
  opacity: 1;
}

/* === Tap mobile === */
.album-item.is-revealed .album-info {
  opacity: 1;
}

/* === Typographie overlay === */
.album-info-title {
  font-family: "DM Serif Text", serif;
  font-style: italic;
  font-size: 0.88rem;
  line-height: 1.25;
  color: rgba(245, 240, 232, 0.95);
}

.album-item:nth-child(9n+1) .album-info-title,
.album-item:nth-child(9n+6) .album-info-title {
  font-size: 1rem;
}

.album-info-artist {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.72rem;
  font-weight: 300;
  color: rgba(220, 215, 205, 0.7);
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
@media (max-width: 900px) {
  .albums-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
}

@media (max-width: 600px) {
  .albums-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
  }
  .album-item:nth-child(9n+1),
  .album-item:nth-child(9n+6) {
    grid-column: span 1;
  }
}
</style>
