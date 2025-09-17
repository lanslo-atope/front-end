<template>
  <span
    class="scramble-text"
    @mouseenter="startScramble"
    @mouseleave="stopScramble"
    aria-hidden="false"
  >
    <span
      v-for="(ch, idx) in display"
      :key="idx"
      class="letter"
      :style="{
        opacity: opacities[idx],
        transform: transforms[idx]
      }"
    >
      {{ ch }}
    </span>
  </span>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  // caractères utilisés pendant le scramble (que des spéciaux par défaut)
  chars: { type: String, default: '!@#$%^&*()_+-=[]{};:,.<>?/|~¤§µ£€' },
  // opacité min/max pendant scramble
  minOpacity: { type: Number, default: 0.25 },
  maxOpacity: { type: Number, default: 0.75 },
  // vitesse d'update (ms) (plus petit => plus rapide)
  baseInterval: { type: Number, default: 10 },
  // base d'itérations par lettre (chaque lettre aura base + jitter)
  baseIterations: { type: Number, default: 6 },
  jitterIterations: { type: Number, default: 6 },
  // décalage gauche->droite pour l'arrêt (ms)
  staggerMs: { type: Number, default: 80 }
})

const letters = props.text.split('')
const display = ref([...letters])                  // caractères affichés
const opacities = ref(letters.map(() => 1))        // opacités pour chaque lettre
const transforms = ref(letters.map(() => 'translateY(0)')) // petit y shift optionnel

let intervals = []  // conteneurs setInterval
let timeouts = []   // conteneurs setTimeout

const randChar = () =>
  props.chars.charAt(Math.floor(Math.random() * props.chars.length))

const randOpacity = () =>
  props.minOpacity + Math.random() * (props.maxOpacity - props.minOpacity)

function clearAll() {
  intervals.forEach(clearInterval)
  timeouts.forEach(clearTimeout)
  intervals = []
  timeouts = []
}

function startScramble() {
  // si déjà en cours, on réinitialise
  clearAll()

  // init affichage (utile si re-hover)
  display.value = letters.map(l => (l === ' ' ? ' ' : randChar()))
  opacities.value = letters.map(l => (l === ' ' ? 1 : randOpacity()))
  transforms.value = letters.map(() => 'translateY(0)')

  letters.forEach((original, i) => {
    if (original === ' ') {
      // rien à animer pour les espaces
      display.value[i] = ' '
      opacities.value[i] = 1
      return
    }

    const iterations = props.baseIterations + Math.floor(Math.random() * props.jitterIterations)
    const freq = props.baseInterval + Math.floor(Math.random() * 25) // petite variance de rythme

    // interval qui met à jour le caractère et l'opacité
    const iv = setInterval(() => {
      display.value[i] = randChar()
      opacities.value[i] = randOpacity()
      // petit mouvement vertical aléatoire pour plus de vie
      const dy = (Math.random() - 0.5) * 4 // -2px → 2px
      transforms.value[i] = `translateY(${dy}px)`
    }, freq)
    intervals.push(iv)

    // calcul du moment d'arrêt : (iterations * freq) + i * staggerMs
    const stopAfter = iterations * freq + i * props.staggerMs

    const to = setTimeout(() => {
      // stop interval et fixer la lettre d'origine
      clearInterval(iv)
      display.value[i] = original
      opacities.value[i] = 1
      transforms.value[i] = 'translateY(0)'
    }, stopAfter)
    timeouts.push(to)
  })

  // sécurité : arrêter tout au bout d'un maximum (prévenir fuite si qqch casse)
  const safety = setTimeout(() => clearAll(), props.staggerMs * letters.length + (props.baseIterations + props.jitterIterations) * (props.baseInterval + 25) + 500)
  timeouts.push(safety)
}

function stopScramble() {
  // si on leave pendant l'anim, on arrête tout et on remet le texte d'origine
  clearAll()
  display.value = [...letters]
  opacities.value = letters.map(() => 1)
  transforms.value = letters.map(() => 'translateY(0)')
}

onBeforeUnmount(() => {
  clearAll()
})
</script>

<style scoped>
.scramble-text {
  display: inline-block;
  cursor: pointer;
  white-space: pre; /* préserve les espaces */
  user-select: none;
}

.letter {
  display: inline-block;
  transition: opacity 0.12s ease, transform 0.12s ease;
  will-change: transform, opacity;
}
</style>
