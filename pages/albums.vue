<template>
  <div class="articles-grid">
    <div
      v-for="article in filteredArticles"
      :key="article.id"
      class="article"
    >
      <img :src="article.image" :alt="article.title" />
      <div class="article-category" :class="article.category"></div>
      <h2 class="article-title">{{ article.title }}</h2>
      <h2 class="article-stitle" v-if="article.stitle">{{ article.stitle }}</h2>
      <p class="article-date">{{ formatFrenchDate(article.date) }}</p>
      <p class="article-content"><PortableText :value="article.content" /></p>
    </div>
  </div>
</template>

<script setup>
import { useArticles } from '~/composables/useArticles'
import { PortableText } from '@portabletext/vue';
const articles = await useArticles()
const filteredArticles = articles.filter(article => article.category === 'albums')
  function formatFrenchDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);

  // La sortie est "samedi 13 septembre 2025 à 16:08"
  // On peut mettre une majuscule pour la première lettre si on veut
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}
</script>

<style scoped>
/* Grille d'articles */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 35px;
  margin: 20px auto;
  padding: 20px;
}

/* Conteneur d'article */
.article {
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.article:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* Image de l'article */
.article img {
  width: 100%;
  max-width: 200px;
  height: auto;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}

/* Catégorie */
.article-category {
  display: none;
  margin: 10px;
  padding: 5px 10px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  border-radius: 4px;
  text-transform: uppercase;
}

/* Différenciation des catégories */
.article-category.albums {
  background-color: #6C757D; /* Gris */
}
.article-category.books {
  background-color: #28A745; /* Vert */
}
.article-category.films {
  background-color: #FFC107; /* Jaune */
}

/* Titre de l'article */
.article-title, .article-stitle  {
  font-family: "Fira Sans Extra Condensed", serif;
  font-style: normal;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0px 0px 0px;
  color: #222;
}
.article-stitle {
  font-size: 0.95rem;
  font-weight: 500;
  color: #444;
} 

/* Date de l'article */
.article-date {
  font-family: "Fira Sans Extra Condensed", serif;
  font-style: normal;
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0 0px 0px;
  color: #666;
}

/* Contenu de l'article */
.article-content {
  font-family: "Fira Sans Extra Condensed", serif;
  font-style: normal;
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0 0px 0px;
  color: #444;
  text-align: left;
}
</style>
