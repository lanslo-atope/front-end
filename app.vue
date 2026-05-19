<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
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
  color: #222;
  letter-spacing: -0.01em;
}

.article-stitle {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.82rem;
  font-weight: 300;
  color: #777;
  margin-top: 3px;
}

.article-date {
  font-family: "Fira Sans", sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: #aaa;
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
  color: #888;
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
  line-height: 1.78;
  margin-bottom: 20px;
  color: #3a3a3a;
}
</style>
