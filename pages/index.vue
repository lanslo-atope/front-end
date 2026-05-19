<template>
  <div class="home">
    <!-- Fond photo désaturé -->
    <div class="home-bg" aria-hidden="true"></div>
    <!-- Grain analogique -->
    <div class="home-grain" aria-hidden="true"></div>

    <div class="home-body">
      <!-- Logo -->
      <div class="home-logo">
        <img src="/assets/logo.png" alt="Te Voilà Bien Consumé" />
      </div>

      <!-- Surtitre éditorial -->
      <div class="home-label-block">
        <span class="home-label">Chroniques narratives</span>
        <span class="home-label-line"></span>
      </div>

      <!-- Titre principal -->
      <h1 class="home-title">
        Te Voilà<br>Bien Consumé
      </h1>

      <!-- Sous-texte -->
      <p class="home-desc">
        Des récits, des impressions, des analyses<br>
        et des fragments autour de musiques<br>
        qui nous traversent.<br>
        Une archive subjective et vivante.
      </p>

      <!-- CTA -->
      <NuxtLink to="/albums" class="home-cta">
        Lire les dernières chroniques
        <span class="home-cta-arrow">→</span>
      </NuxtLink>

      <!-- Citation manifeste -->
      <div class="home-quote">
        <span class="home-quote-star">✦</span>
        <div class="home-quote-text">
          <p>Il n'y a rien de plus brûlant<br>que ce qui reste après la flamme.</p>
          <p class="home-quote-sig">— TWBC</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'home' })
</script>

<style scoped>
/* === Structure === */
.home {
  position: relative;
  min-height: 100vh;
  background: #0c0a08;
  padding-right: 96px; /* réserve l'espace pour SideNav */
  overflow: hidden;
}

/* === Fond photo === */
.home-bg {
  position: absolute;
  inset: 0;
  background-image: url('https://cdn.sanity.io/images/w6f4ec13/production/ada85cf666b6d2979ac09bf40d766ca94c0757e3-4032x3024.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.22;
  filter: grayscale(1) brightness(0.6);
}

/* === Grain analogique === */
.home-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 700'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>");
  background-size: 300px;
  opacity: 0.07;
  mix-blend-mode: overlay;
}

/* === Corps principal === */
.home-body {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 48px 64px 56px;
  display: flex;
  flex-direction: column;
  max-width: 820px;
}

/* === Logo === */
.home-logo img {
  width: 44px;
  height: auto;
  display: block;
  margin-bottom: 52px;
  filter: brightness(10) saturate(0);
  opacity: 0.9;
}

/* === Surtitre === */
.home-label-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.home-label {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.58rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(232, 105, 95, 0.72);
}

.home-label-line {
  display: block;
  width: 26px;
  height: 1px;
  background: #e8695f;
  opacity: 0.55;
}

/* === Titre === */
.home-title {
  font-family: "Anton", sans-serif;
  font-weight: 400;
  font-size: clamp(3.2rem, 8.5vw, 7rem);
  line-height: 0.92;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  color: #e8695f;
  margin: 0 0 44px;
}

/* === Sous-texte === */
.home-desc {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  line-height: 1.72;
  color: rgba(215, 208, 198, 0.58);
  margin: 0 0 44px;
  max-width: 360px;
}

/* === CTA === */
.home-cta {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.62rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #e8695f;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(232, 105, 95, 0.35);
  padding-bottom: 4px;
  transition: border-color 0.25s ease, gap 0.25s ease;
  align-self: flex-start;
  margin-bottom: auto;
}

.home-cta:hover {
  border-color: #e8695f;
  gap: 16px;
}

.home-cta-arrow {
  transition: transform 0.25s ease;
}

.home-cta:hover .home-cta-arrow {
  transform: translateX(4px);
}

/* === Citation === */
.home-quote {
  margin-top: 72px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  max-width: 360px;
}

.home-quote-star {
  font-size: 0.65rem;
  color: #e8695f;
  opacity: 0.6;
  flex-shrink: 0;
  margin-top: 3px;
}

.home-quote-text p {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.58rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(215, 208, 198, 0.38);
  line-height: 1.65;
  margin: 0;
}

.home-quote-text .home-quote-sig {
  margin-top: 8px;
  color: rgba(215, 208, 198, 0.22);
}

/* === Responsive === */
@media (max-width: 768px) {
  .home {
    padding-right: 0;
    padding-top: 50px; /* hauteur de la bande mobile SideNav */
  }

  .home-body {
    padding: 40px 28px 60px;
    min-height: calc(100vh - 50px);
  }

  .home-logo {
    display: none; /* logo déjà dans SideNav mobile */
  }

  .home-title {
    font-size: clamp(2.8rem, 13vw, 5rem);
  }
}

@media (max-width: 480px) {
  .home-body {
    padding: 32px 20px 48px;
  }
}
</style>
