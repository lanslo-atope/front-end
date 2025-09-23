<template>
  <nav>
    <div class="logo" @click="openLayer">
      <img src="/assets/logo.png" alt="logo" />
    </div>
    <ul>
      <li><NuxtLink to="/"><ScrambleText text="Accueil"/></NuxtLink></li>
      <li><NuxtLink to="/albums"><ScrambleText text="Chroniques" /></NuxtLink></li>
      <li><NuxtLink to="/films"><ScrambleText text="Cinéma"/></NuxtLink></li>
      <li><NuxtLink to="/books"><ScrambleText text="Livres"/></NuxtLink></li>
    </ul>

    <!-- Layer plein écran -->
    <div v-if="isLayerOpen" class="overlay" @click="closeLayer">
      <div class="overlay-content" @click.stop>
        <span
          v-for="(letter, index) in letters"
          :key="index"
          class="overlay-letter"
          :style="randomStyle(index)"
        >
          {{ letter }}
        </span>
      </div>
    </div>
    
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isLayerOpen = ref(false)
const text = "Ici, on ne vend rien. On rallume juste la lumière. Et si tu regardes, tu entendras peut-être. Te voilà bien consumé !";

const letters = text.split('')

const openLayer = () => {
  isLayerOpen.value = true
}
const closeLayer = () => {
  isLayerOpen.value = false
}

// Style "chaotique mais en ligne"
const randomStyle = (i) => {
  const size = 1 + Math.random() * 1.1 // tailles énormes 2rem → 7rem
  const yOffset = Math.random() * 50 - 20 // léger décalage vertical
  const zIndex = Math.random() > 0.7 ? 2 : 1 // parfois au-dessus
  return {
    fontSize: `${size}rem`,
    transform: `translateY(${yOffset}px)`,
    zIndex,
  }
}
</script>

<style scoped>
/* --- Navigation principale --- */
nav {
  display: flex;
  gap: 2rem;
  list-style: none;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.stagger-link {
  position: relative;
  font-size: 2rem;
  font-weight: 600;
  display: inline-block;
  overflow: hidden;
}
.stagger-link span {
  display: inline-block;
  transform: translateY(100%);
}
.logo img {
  max-width: 150px;
  cursor: pointer;
}

ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

ul li {
  margin-right: 25px;
}

a {
  text-decoration: none;
  color: black;
  font-family: "Fira Sans", sans-serif;
  font-weight: 400;
  font-size: 1rem;
}

/* --- Overlay plein écran --- */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  overflow: hidden;
}

.overlay-content {
  max-width: 90%;
  line-height: 0.8; /* réduit l’espacement vertical */
  text-align: left;
  white-space: pre-wrap; /* conserve les retours à la ligne */
}

/* Lettres stylées */
.overlay-letter {
  display: inline-block;
  color: white;
  font-family: "Fira Sans", sans-serif;
  margin: -10px; /* permet le chevauchement */
  opacity: 1;
}
</style>
