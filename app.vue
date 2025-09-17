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
  position: relative;
  background: url('/images/film.jpg') no-repeat center center fixed;
  background-size: cover;  
}

html::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); /* Simple couleur pour tester */
  z-index: -1;
}


/* Pour s'assurer que le Nuxt root occupe tout l'écran */
#app {
  width: 100%;
  height: 100%;
}
</style>