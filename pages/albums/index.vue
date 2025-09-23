<template>
  <div class="articles-grid">
    <NuxtLink 
      v-for="article in filteredArticles"
      :key="article._id"
      :to="`/albums/${article.slug.current}`"
      class="article"
    >
      <div class="noise-wrapper">
        <img :src="article.image" :alt="article.title" />
        <!-- Calque de grain -->
        <div class="grain"></div>
      </div>
      <div class="article-overlay">
        <div class="article-title">{{ article.title }}</div>
        <div class="article-stitle" v-if="article.stitle">{{ article.stitle }}</div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { useArticles } from '~/composables/useArticles'

const articles = await useArticles()
const filteredArticles = articles.filter(a => a.category === 'albums')
</script>

<style scoped>
/* === Grille === */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 35px;
  margin: 10px auto;
  padding: 20px;
}

/* === Conteneur === */
.article {
  position: relative;
  overflow: hidden;
  border-radius: 15px; 
}
.article-title{
  font-style: italic;
  color: #e8695f;
}

/* === Image === */
.noise-wrapper {
  position: relative;
}

.noise-wrapper img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  filter: brightness(1.2) contrast(0.9);
  transition: transform 0.3s ease, filter 0.5s ease;
}

/* === Calque grain === */
.grain {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 700'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='5' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)' /></svg>");
  background-size: cover;
  mix-blend-mode: overlay;
  transition: opacity 0.2s ease;
}

/* === Hover effets === */
.article:hover .noise-wrapper img {
  transform: scale(1.05);
  filter: brightness(3.6) contrast(1);
}

.article:hover .grain {
  opacity: 1; /* Intensité du grain */
}

/* === Overlay texte === */
.article-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  color: #111;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}


.article:hover .article-overlay {
  opacity: 1;
}
</style>