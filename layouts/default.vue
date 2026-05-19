<template>
  <div class="layout">
    <main>
      <slot />
      <div class="background" />
      <Footer />
    </main>
    <SideNav />
  </div>
</template>

<script setup>
import SideNav from '~/components/SideNav.vue'
import Footer from '~/components/Footer.vue'
</script>

<style scoped>
.layout {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

main {
  height: 100%;
  padding-right: 96px; /* réserve l'espace pour SideNav */
  overflow-y: auto;
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
  background-repeat: no-repeat;
  z-index: -1;
}

@media (max-width: 768px) {
  main {
    padding-right: 0;
    padding-top: 50px; /* hauteur de la bande mobile SideNav */
  }
}
</style>
