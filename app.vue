<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* ============================================================
   PALETTE — Te Voilà Bien Consumé
   Atmosphère : papier vieilli, encre, archive, terracotta brûlée
   ============================================================ */
:root {
  /* Accent */
  --accent:        #e8695f;   /* terracotta brûlée — couleur signature */
  --accent-soft:   #eda49a;   /* rose poussiéreux — hover doux */
  --accent-dim:    #c4544a;   /* plus sombre, plus brûlé — état actif */
  --accent-ghost:  rgba(232, 105, 95, 0.10);  /* teinture très légère */

  /* Encre — texte */
  --ink:           #1e1b18;   /* noir encre légèrement chaud */
  --ink-mid:       #3d3830;   /* corps de texte, charbon */
  --ink-soft:      #6a6460;   /* secondaire, descriptions */
  --ink-muted:     #96908b;   /* métadonnées, légendes */
  --ink-ghost:     #b4afaa;   /* très discret — dates, compteurs */

  /* Papier — fonds */
  --paper:         #f5f2ec;   /* papier vieilli, off-white chaud */
  --paper-warm:    #ede8df;   /* légèrement plus chaud, vieux journal */
  --paper-dark:    #1a1714;   /* presque noir, encre profonde */

  /* Séparateurs */
  --line:          rgba(30, 27, 24, 0.08);   /* séparateurs intérieurs */
  --line-strong:   rgba(30, 27, 24, 0.16);   /* nav, footer, sections */
  --line-soft:     rgba(30, 27, 24, 0.05);   /* quasi invisible */

  /* Overlays image */
  --overlay-dark:  rgba(5, 3, 2, 0.72);
  --overlay-mid:   rgba(5, 3, 2, 0.38);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
}

a, .article {
  text-decoration: none;
  color: inherit;
}

/* --- Système typographique global --- */

.article-title {
  font-family: "DM Serif Text", serif;
  font-weight: 400;
  font-style: italic;
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.25;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.article-stitle {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.82rem;
  font-weight: 300;
  color: var(--ink-soft);
  margin-top: 3px;
}

.article-date {
  font-family: "Fira Sans", sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: var(--ink-muted);
  margin-top: 5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.album-author {
  font-family: "Fira Sans", sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: var(--ink-soft);
  margin: 35px 0 25px;
  font-weight: 300;
  font-style: italic;
}

.author-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.article-content {
  font-family: "Fira Sans", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.58;
  color: var(--ink-mid);
}

/* Typographie éditoriale — base commune pour tout texte en prose */
.prose-editorial p {
  margin: 0 0 1rem;
  line-height: 1.58;
}

.prose-editorial p:last-child {
  margin-bottom: 0;
}
</style>
