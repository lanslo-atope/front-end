<template>
  <div class="noise-bg" ref="noise"></div>
</template>

<script setup>
import { onMounted } from "vue"
import gsap from "gsap"

onMounted(() => {
  const turbulence = document.querySelector("#turbulence")

  if (turbulence) {
    gsap.to(turbulence, {
      duration: 3,
      attr: { seed: 100 }, // variation aléatoire
      repeat: -1,
      yoyo: true,
      ease: "none"
    })
  }
})
</script>

<style scoped>
.noise-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: -1;
  background: transparent;
}

/* utiliser un filtre SVG inline */
.noise-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background: black; /* ou autre couleur si nécessaire, mais très faible opacité pour calmer le contraste */
  opacity: 0.5; /* ajuster pour rendre le bruit très subtil */
  mix-blend-mode: overlay; /* ou overlay / multiply selon rendu */
  filter: url('#svgNoiseFilter');
}
</style>
