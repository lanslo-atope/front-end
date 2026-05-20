<template>
  <div class="home">
    <!-- Fond photo désaturé -->
    <div class="home-bg" aria-hidden="true"></div>
    <!-- Grain analogique -->
    <div class="home-grain" aria-hidden="true"></div>

    <div class="home-body">
      <!-- Titre principal -->
      <h1 class="home-title">
        Te Voilà<br>Bien Consumé
      </h1>

      <!-- Sous-texte -->
      <p class="home-desc">
        Des récits, des impressions, des analyses et des fragments autour de musiques qui nous traversent.<br>
        Une archive subjective et vivante.
      </p>

      <!-- CTA -->
      <div class="home-cta-block">
        <NuxtLink to="/albums" class="home-cta">
          Lire les dernières chroniques
          <span class="home-cta-arrow">→</span>
        </NuxtLink>
        <ul v-if="latest?.length" class="home-latest">
          <li v-for="item in latest" :key="item._id">
            <NuxtLink :to="`/albums/${item.slug.current}`" class="home-latest-link">
              <span class="home-latest-title">{{ item.title }}</span>
              <span v-if="item.stitle" class="home-latest-artist">{{ item.stitle }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- Citation manifeste — ferrée en bas à droite -->
    <div class="home-quote">
      <span class="home-quote-star">✦</span>
      <div class="home-quote-text">
        <p>Il n'y a rien de plus brûlant<br>que ce qui reste après la flamme.</p>
        <p class="home-quote-sig">— TWBC</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSanity } from '~/composables/useSanity'

definePageMeta({ layout: 'home' })

const client = useSanity()
const { data: latest } = await useAsyncData('latest', () =>
  client.fetch(`*[_type == "article" && category == "albums"] | order(date desc)[0..2] {
    _id, title, stitle, slug
  }`)
)
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
  background-image: url('/assets/accueil-bkg.png');
  background-size: cover;
  background-position: center;
  opacity: 0.55;
  filter: grayscale(1) brightness(0.7);
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

/* === Titre === */
.home-title {
  font-family: "League Gothic", sans-serif;
  font-weight: 400;
  font-stretch: condensed;
  font-size: clamp(5rem, 12vw, 12rem);
  line-height: 0.9;
  letter-spacing: -0.01em;
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

/* === CTA block === */
.home-cta-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-self: flex-start;
  margin-bottom: auto;
}

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

/* === Dernières chroniques === */
.home-latest {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.home-latest-link {
  display: flex;
  align-items: baseline;
  gap: 8px;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.home-latest-link:hover {
  opacity: 0.65;
}

.home-latest-title {
  font-family: "DM Serif Text", serif;
  font-style: italic;
  font-size: 0.78rem;
  color: rgba(215, 208, 198, 0.72);
  line-height: 1.3;
}

.home-latest-artist {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.6rem;
  font-weight: 300;
  color: rgba(215, 208, 198, 0.38);
  white-space: nowrap;
}

/* === Citation — ferrée bas droite === */
.home-quote {
  position: absolute;
  bottom: 56px;
  right: 64px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  max-width: 320px;
  text-align: right;
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
    padding-top: 50px;
  }

  .home-body {
    padding: 40px 28px 60px;
    min-height: calc(100vh - 50px);
  }

  .home-title {
    font-size: clamp(2.8rem, 13vw, 5rem);
  }

  .home-quote {
    display: none;
  }
}

@media (max-width: 480px) {
  .home-body {
    padding: 32px 20px 48px;
  }
}
</style>
