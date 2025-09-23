<template>
  <span class="scramble-text" ref="wrapper">
    <span 
      v-for="(char, i) in letters" 
      :key="i" 
      class="char-wrapper"
    >
      <!-- Texte normal -->
      <span class="char base">{{ char }}</span>
      <!-- Texte hover -->
      <span class="char hover">{{ char }}</span>
    </span>
  </span>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { gsap } from "gsap"

const props = defineProps({
  text: { type: String, required: true },
})

const wrapper = ref(null)
const letters = props.text.split("")

onMounted(() => {
  const charWrappers = wrapper.value.querySelectorAll(".char-wrapper")

  // init: hover invisible
  charWrappers.forEach((wrapperEl) => {
    const hoverChar = wrapperEl.querySelector(".hover")
    gsap.set(hoverChar, { yPercent: 100, opacity: 0 })
  })

  wrapper.value.addEventListener("mouseenter", () => {
    charWrappers.forEach((wrapperEl, i) => {
      const baseChar = wrapperEl.querySelector(".base")
      const hoverChar = wrapperEl.querySelector(".hover")

      // direction random au moment du hover
      const dir = Math.random() > 0.5 ? "up" : "down"
      const offset = dir === "up" ? -100 : 100

      // reset position avant anim
      gsap.set(hoverChar, {
        yPercent: dir === "up" ? 100 : -100,
        opacity: 0,
      })

      gsap.to(baseChar, {
        yPercent: offset,
        opacity: 0,
        duration: 0.3,
        delay: i * 0.02,
        ease: "power2.inOut",
      })
      gsap.to(hoverChar, {
        yPercent: 0,
        opacity: 1,
        duration: 0.3,
        delay: i * 0.02,
        ease: "power2.inOut",
      })
    })
  })

  wrapper.value.addEventListener("mouseleave", () => {
    charWrappers.forEach((wrapperEl, i) => {
      const baseChar = wrapperEl.querySelector(".base")
      const hoverChar = wrapperEl.querySelector(".hover")

      // Reprend la direction utilisée à l’entrée
      const currentY = gsap.getProperty(hoverChar, "yPercent")
      const dir = currentY > 0 ? "down" : "up"
      const offset = dir === "up" ? -100 : 100

      gsap.to(baseChar, {
        yPercent: 0,
        opacity: 1,
        duration: 0.3,
        delay: i * 0.02,
        ease: "power2.inOut",
      })
      gsap.to(hoverChar, {
        yPercent: dir === "up" ? 100 : -100,
        opacity: 0,
        duration: 0.3,
        delay: i * 0.02,
        ease: "power2.inOut",
      })
    })
  })
})
</script>

<style scoped>
.scramble-text {
  display: inline-flex;
  cursor: pointer;
  overflow: hidden;
}

.char-wrapper {
  position: relative;
  display: inline-block;
  overflow: hidden;
  line-height: 1;
}

.char {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  will-change: transform, opacity;
}

.base {
  color: #e8695f; /* couleur normale */
  position: relative;
}

.hover {
  color: #e8695f;
}
</style>
