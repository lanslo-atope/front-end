<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

</template>

<style>
/* Reset global */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* Inclure les bordures et paddings dans la taille totale */
}

/* Garantir qu'aucun espace ne dépasse */
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden; /* Évite les défilements inutiles */
}

/* Pour s'assurer que le Nuxt root occupe tout l'écran */
#app {
  width: 100%;
  height: 100%;
}
a, .article {
  text-decoration: none;
  color: inherit;
}
.article-title  {
  font-family: "DM Serif Text", serif;
  font-weight: 400;
  font-style: normal;
  margin: 0;
  font-size: 1.3rem;
  line-height: 20px;
  color: #222;
}
.article-stitle {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: #444;
} 

.article-date {
 font-family: "Fira Sans", sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #666;
  margin-top:4px;
}

.album-author {
  font-family: "Fira Sans", sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #666;
  margin: 25px 0 25px;
  font-weight: 300;
  font-style: italic;
}

.author-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
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
  line-height: 1.6;
  margin-bottom: 15px;
  color: #444;
}

</style>