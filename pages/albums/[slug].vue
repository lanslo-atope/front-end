<template>
  <div v-if="album" class="album-page">
    <div class="album-layout">
      <!-- Colonne gauche -->
      <div class="album-left">
        <div class="album-cover">
          <img :src="album.image" :alt="album.title" />
        </div>
        <div class="album-meta">
          <h1 class="album-title">{{ album.title }}</h1>
          <h2 class="album-artist-title" v-if="album.stitle">{{ album.stitle }}</h2>
          <h2 class="album-label-title" v-if="album.labelAndRelease">
            <svg class="label-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z"/>
              <circle cx="7.5" cy="7.5" r="1.5" fill="white"/>
            </svg>
            <p>{{ album.labelAndRelease.label + " — " + formatLabelDate(album.labelAndRelease.releaseYear) }}</p>
          </h2>
        </div>
        <div class="album-back">
          <NuxtLink to="/albums" class="back-btn" aria-label="Retour aux albums">
            <svg viewBox="0 0 50 9">
              <path d="m0 4.5 5-3m-5 3 5 3m45-3h-77" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Colonne droite -->
      <div class="album-right">
        <div class="album-content">
          <PortableText :value="album.content" />
          <div class="album-author">
            <span v-if="album.author?.avatar" class="author-avatar">
              <img :src="album.author.avatar" :alt="album.author.name" />
            </span>
            <span>{{ album.author.name }}</span>
            —
            <span class="album-date">{{ formatAuthorDate(album.date) }}</span>
          </div>
        </div>

        <!-- Chronique suivante -->
        <div v-if="nextAlbum" class="album-next">
          <span class="album-next-label">dans l'archive</span>
          <NuxtLink :to="`/albums/${nextAlbum.slug.current}`" class="album-next-link">
            {{ nextAlbum.title }}
            <span v-if="nextAlbum.stitle" class="album-next-artist"> — {{ nextAlbum.stitle }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <p class="loading-msg">Chargement…</p>
  </div>
</template>

<script setup>
import { useSanity } from '~/composables/useSanity'
import { useRoute } from 'vue-router'
import { PortableText } from '@portabletext/vue'

const route = useRoute()
const client = useSanity()

const { data: album } = await useAsyncData(`album-${route.params.slug}`, () =>
  client.fetch(
    `*[_type == "article" && slug.current == $slug][0]{
      _id,
      title,
      stitle,
      date,
      labelAndRelease,
      author->{ name, "avatar": avatar.asset->url },
      "image": image.asset->url,
      content,
      category
    }`,
    { slug: route.params.slug }
  )
)

const { data: nextAlbum } = await useAsyncData(`album-next-${route.params.slug}`, () => {
  if (!album.value?.date) return null
  return client.fetch(
    `*[_type == "article" && category == "albums" && date < $date] | order(date desc)[0] {
      title, stitle, slug
    }`,
    { date: album.value.date }
  )
})

function formatAuthorDate(dateString) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateString))
}

function formatLabelDate(dateString) {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
  }).format(new Date(dateString))
}
</script>

<style scoped>
.album-page {
  max-width: 1000px;
  margin: 50px 0 0;
  padding: 20px;
  font-family: "Fira Sans", sans-serif;
  line-height: 1.78;
  color: #222;
}

/* Layout 2 colonnes */
.album-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 50px;
  align-items: start;
}

/* Colonne gauche */
.album-cover img {
  width: 100%;
  border-radius: 2px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.12);
  background: #f9f9f9;
  margin-bottom: 18px;
}

.album-title {
  font-family: "DM Serif Text", serif;
  font-weight: 400;
  font-style: italic;
  font-size: 2rem;
  margin: 0 0 6px;
  color: var(--accent);
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.album-artist-title {
  font-size: 1rem;
  font-weight: 300;
  color: var(--ink-soft);
  margin: 0 0 10px;
}

.album-label-title {
  font-size: 0.78rem;
  font-weight: 300;
  color: var(--ink-muted);
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.album-label-title p {
  margin-left: -5px;
}

.label-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.5;
}

/* Colonne droite */
.album-right {
  max-width: 580px;
}

.album-content {
  font-size: 1rem;
  color: var(--ink-mid);
  line-height: 1.78;
}

.album-content :deep(p) {
  margin-bottom: 1.5em;
}

.album-content :deep(p:first-of-type) {
  font-size: 1.04rem;
}

.album-content > :first-child::first-letter {
  float: left;
  font-size: 3.5rem;
  font-family: "DM Serif Text", serif;
  padding-right: 8px;
  padding-top: 6px;
  font-weight: 100;
}

/* Auteur */
.album-author {
  font-family: "Fira Sans", sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--ink-muted);
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  font-weight: 300;
  font-style: italic;
}

.author-avatar img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

/* Chronique suivante */
.album-next {
  margin-top: 70px;
  padding-top: 24px;
  border-top: 1px solid var(--line-soft);
}

.album-next-label {
  display: block;
  font-family: "Fira Sans", sans-serif;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-ghost);
  margin-bottom: 10px;
}

.album-next-link {
  font-family: "DM Serif Text", serif;
  font-style: italic;
  font-size: 1.05rem;
  color: var(--ink-mid);
  text-decoration: none;
  transition: color 0.2s ease;
}

.album-next-link:hover {
  color: var(--accent);
}

.album-next-artist {
  font-family: "Fira Sans", sans-serif;
  font-style: normal;
  font-size: 0.82rem;
  font-weight: 300;
  color: var(--ink-muted);
}

/* Bouton retour */
.album-back {
  margin-top: 30px;
  position: fixed;
  bottom: 30px;
}

.back-btn svg {
  width: 36px;
  height: auto;
  stroke: currentColor;
  fill: none;
  stroke-width: 1;
  transition: transform 0.15s ease;
  color: var(--ink-muted);
}

.back-btn:hover svg {
  transform: translateX(-4px);
  color: var(--ink-mid);
}

.loading-msg {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.9rem;
  font-style: italic;
  color: #aaa;
  padding: 40px 20px;
}

/* Responsive */
@media (max-width: 900px) {
  .album-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .album-left {
    max-width: 300px;
  }
  .album-right {
    max-width: 100%;
  }
}
</style>
