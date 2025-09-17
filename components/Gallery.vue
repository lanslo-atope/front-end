<template>
    <div>
      <div class="filters">
        <button 
          v-for="category in categories" 
          :key="category" 
          @click="filterByCategory(category)" 
          :class="{ active: activeCategory === category }"
        >
          {{ category }}
        </button>
      </div>
      <div class="gallery">
        <div 
          v-for="article in displayedArticles" 
          :key="article.id" 
          class="article" 
          :class="article.type"
        >
          <img v-if="article.image" :src="article.image" :alt="article.title" />
          <h3>{{ article.title }}</h3>
          <p>{{ article.date }}</p>
        </div>
      </div>
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  const articles = ref([]); // Tous les articles
  const displayedArticles = ref([]); // Articles actuellement affichés
  const activeCategory = ref('all'); // Catégorie active
  const loading = ref(false); // Indique si on charge des données
  
  // Charger les articles JSON au montage
  onMounted(async () => {
    articles.value = await fetch('/data/articles.json').then(res => res.json());
    displayedArticles.value = articles.value.slice(0, 10); // Premiers articles
  });
  
  // Liste des catégories uniques
  const categories = computed(() => {
    const allCategories = articles.value.map(article => article.category);
    return ['all', ...new Set(allCategories)];
  });
  
  // Filtrer par catégorie
  function filterByCategory(category) {
    activeCategory.value = category;
    if (category === 'all') {
      displayedArticles.value = articles.value.slice(0, 10);
    } else {
      displayedArticles.value = articles.value.filter(article => article.category === category).slice(0, 10);
    }
  }
  
  // Charger plus d'articles au scroll
  function loadMore() {
    if (loading.value) return;
  
    loading.value = true;
    setTimeout(() => {
      const start = displayedArticles.value.length;
      const nextArticles = articles.value
        .filter(article => activeCategory.value === 'all' || article.category === activeCategory.value)
        .slice(start, start + 10);
  
      displayedArticles.value.push(...nextArticles);
      loading.value = false;
    }, 500); // Simule un délai pour le chargement
  }
  
  // Écouteur pour le défilement
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      loadMore();
    }
  });
  </script>
  
  <style scoped>
  .filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .filters button {
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
  }
  
  .filters button.active {
    font-weight: bold;
    text-decoration: underline;
  }
  
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .article {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .article img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .article.text {
    background-color: #f9f9f9;
  }
  
  .loading {
    text-align: center;
    margin-top: 1rem;
  }
  </style>
  