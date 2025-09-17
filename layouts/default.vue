<template>
  <div class="layout">
    <nav class="navbar">
      <NavBar />
    </nav>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue'
</script>

<style scoped>
/* Conteneur principal */
.layout {
  display: flex; /* Mise en page flexible */
  position: relative;
  height: 100vh; /* Prend toute la hauteur */
  overflow: hidden;
}

/* Contenu principal */
main {
  margin-top: 50px; /* Laisse de la place pour la navigation */
  flex-grow: 1; /* Prend tout l'espace restant */
  padding: 20px;
  overflow-y: auto; /* Permet de scroller si le contenu dépasse */
  height: 100%; /* Assure une pleine hauteur */
  z-index: 1;
}

/* Couche de bruit */
.noise-layer {
  background-image: 
    linear-gradient(#faf2e0, #faf2e0), /* Couleur de teinte */
    url("/images/bkg.png"); 
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: bottom;
  z-index: 0; /* Sous tous les éléments visibles */
  pointer-events: none;
  background-blend-mode: multiply;
}
</style>
