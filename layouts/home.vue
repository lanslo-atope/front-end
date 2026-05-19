<template>
  <div class="home-layout">
    <slot />
    <SideNav />
  </div>
</template>

<script setup>
import SideNav from '~/components/SideNav.vue'
</script>

<style scoped>
.home-layout {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}
</style>
