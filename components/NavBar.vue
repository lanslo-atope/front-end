<template>
  <nav>
    <div class="logo" @click="openLayer">
      <img src="/images/logo.png" alt="logo" />
    </div>
    <ul>
      <li><NuxtLink to="/"><ScrambleText text="Accueil"/></NuxtLink></li>
      <li><NuxtLink to="/albums"><ScrambleText text="Chroniques passagères" /></NuxtLink></li>
      <li><NuxtLink to="/films"><ScrambleText text="Débordements"/></NuxtLink></li>
      <li><NuxtLink to="/books"><ScrambleText text="Mixtape"/></NuxtLink></li>
    </ul>

    <!-- Layer plein écran -->
    <div v-if="isLayerOpen" class="overlay" @click="closeLayer">
      <div class="overlay-content" @click.stop>
        <h1>Te voilà bien consumé</h1>
        <p>
          Au début on pourrait se demander si ce site avait une véritable raison
          d'exister. Et pourtant, puisque nous voilà face à face, autant y aller.
          Tu penses peut-être que quelques mots bien choisis suffisent à tout
          expliquer ? Fallait pas venir.<br />
          Te voilà bien consumé.
        </p>
      </div>
    </div>
  </nav>
</template>



<script setup>
import { ref } from 'vue'

const isLayerOpen = ref(false)
const openLayer = () => {
  isLayerOpen.value = true
}
const closeLayer = () => {
  isLayerOpen.value = false
}
</script>

<style scoped>
/* --- Navigation principale --- */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* Hauteur du menu */
  padding: 0 20px; /* Espacement latéral */
  z-index: 1000; /* Assure que le menu reste au-dessus du contenu */
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.logo img {
  max-width: 150px;
  cursor: pointer; /* Indique que c'est cliquable */
}

ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

ul li {
  margin-right: 25px; /* Espacement entre les éléments du menu */
}

a {
  text-decoration: none;
  color: black;
  font-family: "Fira Sans Extra Condensed", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 1rem;
  transition: color 0.3s ease;
}

a:hover { /* Couleur au survol */
}

/* --- Layer plein écran --- */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9); /* Fond sombre */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* Par-dessus la navigation */
}

.overlay-content {
  width: 300px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1); /* Fond légèrement transparent */
  border-radius: 10px;
  color: #d0c09e;
}

.overlay-content h1 {
  font-family: "Pirata One", serif;
  font-size: 2rem;
  margin-bottom: 20px;
}

.overlay-content p {
  font-family: "Fira Sans Extra Condensed", serif;
  font-size: 1rem;
  line-height: 1.5;
  text-align: justify;
}
</style>
