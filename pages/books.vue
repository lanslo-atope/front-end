<template>
    <div class="articles-grid">
      <div
        v-for="article in filteredArticles"
        :key="article.id"
        class="article"
      >
        <img :src="article.image" :alt="article.title" />
        <h2>{{ article.title }}</h2>
        <p>{{ article.date }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useArticles } from '~/composables/useArticles'
  
  const articles = await useArticles()
  const filteredArticles = articles.filter(article => article.category === 'books')
  </script>
  
  <style scoped>
  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
    margin-left: 200px; /* Ajuste selon la largeur de la barre */
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
  