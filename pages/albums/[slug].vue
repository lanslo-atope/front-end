<template>
  <div v-if="album" class="album-page">
    <!-- Bouton retour -->
    <div class="album-back">
      <NuxtLink to="/albums" class="back-btn" aria-label="Retour aux albums">
        <svg viewBox="0 0 50 9">
          <path d="m0 4.5 5-3m-5 3 5 3m45-3h-77" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Grille principale -->
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
            <p>{{ album.labelAndRelease.label+" — "+formatLabelDate(album.labelAndRelease.releaseYear) }}</p>
          </h2>
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
        
      </div>
    </div>
  </div>

  <div v-else>
    <p>x</p>
  </div>
</template>

<script setup>
import { useSanity } from '~/composables/useSanity'
import { useRoute } from 'vue-router'
import { PortableText } from '@portabletext/vue'

const route = useRoute()
const client = useSanity()

const query = `
  *[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    stitle,
    date,
    labelAndRelease,
    author->{
      name,
      "avatar": avatar.asset->url
    },
    "image": image.asset->url,
    content,
    category
  }
`

const album = await client.fetch(query, { slug: route.params.slug })

function formatAuthorDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}
function formatLabelDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
  }).format(date)
}
</script>

<style scoped>
.album-page {
  max-width: 1000px; /* plus large pour les 2 colonnes */
  margin: 0 auto;
  padding: 20px;
  font-family: "Fira Sans", sans-serif;
  line-height: 1.;
  color: #222;
}

/* Layout 2 colonnes */
.album-layout {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 35px;
  align-items: start;
}

/* Colonne gauche */
.album-cover img {
  width: 100%;
  border-radius: 6px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  background: #f9f9f9;
  margin-bottom: 10px;
}

.album-meta {
  text-align: left;
}

.album-title {
  font-family: "DM Serif Text", serif;
  font-weight: 400;
  font-style: italic;
  font-size: 2.2rem;
  margin: 0 0 10px;
  color: #e8695f;
  line-height: 30px;
}

.album-artist-title {
  font-size: 1.2rem;
  font-weight: 400;
  color: #e8695f;
  margin: 0 0 10px;
}

.album-label-title {
  font-size: 0.8rem;
  font-weight: 200;
  color: #444;
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.album-label-title p{
  margin-left: -5px;
}
.label-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
}

.album-author {
  font-size: 0.95rem;
  color: #444;
}

.author-avatar img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
  vertical-align: middle;
}

/* Colonne droite */
.album-right {
  max-width: 750px; /* limite pour la lisibilité */
}

.album-content {
  font-size: 0.9rem;
  color: #333;
}

.album-content > :first-child::first-letter {
  float: left;
  font-size: 3.5rem;
  font-family: "DM Serif Text", serif;
  line-height: 0.8;
  padding-right: 8px;
  padding-top: 6px;
  font-weight: 100;
}

/* Responsive */
@media (max-width: 900px) {
  .album-layout {
    grid-template-columns: 1fr;
  }
  .album-left {
    max-width: 350px;
    margin: 0 auto 30px;
  }
  .album-right {
    max-width: 100%;
  }
}

/* Bouton retour */
.album-back {
  margin-bottom: 20px;
}

.back-btn svg {
  width: 40px;
  height: auto;
  stroke: currentColor;
  fill: none;
  stroke-width: 1;
  transition: transform 0.1s ease;
}

.back-btn:hover svg {
  transform: translateX(-3px);
}
</style>
