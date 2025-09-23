<template>
  <div class="layout">
    <nav class="navbar">
      <NavBar />
    </nav>
    <main>
      <NuxtPage />
    <div class="background" />
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
  margin-top: 70px; /* Laisse de la place pour la navigation */
  flex-grow: 1; /* Prend tout l'espace restant */
  padding: 20px;
  overflow-y: auto; /* Permet de scroller si le contenu dépasse */
  height: 100%; /* Assure une pleine hauteur */
  z-index: 1;
}
.background {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  background-image: url('https://cdn.sanity.io/images/w6f4ec13/production/ada85cf666b6d2979ac09bf40d766ca94c0757e3-4032x3024.jpg');
  background-repeat:no-repeat;
  z-index: -1;
}
</style>
