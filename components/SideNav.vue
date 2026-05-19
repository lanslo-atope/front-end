<template>
  <aside class="side-nav">
    <div class="side-top">
      <NuxtLink to="/">
        <img src="/assets/logo.png" alt="TWBC" class="side-logo" />
      </NuxtLink>
    </div>

    <nav class="side-links">
      <NuxtLink to="/" class="side-link" exact-active-class="is-active">Accueil</NuxtLink>
      <NuxtLink to="/albums" class="side-link" active-class="is-active">Chroniques</NuxtLink>
      <NuxtLink to="/films" class="side-link" active-class="is-active">Cinéma</NuxtLink>
      <NuxtLink to="/books" class="side-link" active-class="is-active">Livres</NuxtLink>
    </nav>

    <div class="side-bottom">
      <img src="/assets/logo.png" alt="TWBC" class="side-bottom-logo" />
    </div>
  </aside>
</template>

<style scoped>
.side-nav {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 96px;
  background: #ede8df;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  z-index: 200;
  border-left: 1px solid rgba(30, 27, 24, 0.1);
}

.side-top {
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(30, 27, 24, 0.1);
  width: 100%;
  display: flex;
  justify-content: center;
}

.side-logo {
  width: 42px;
  height: auto;
  display: block;
}

.side-links {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.side-link {
  writing-mode: sideways-lr;
  font-family: "Fira Sans", sans-serif;
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #6a6460;
  text-decoration: none;
  padding: 18px 0;
  transition: color 0.2s ease;
}

.side-link:hover,
.side-link.is-active {
  color: #e8695f;
}

.side-bottom {
  padding-top: 28px;
  border-top: 1px solid rgba(30, 27, 24, 0.1);
  width: 100%;
  display: flex;
  justify-content: center;
}

.side-bottom-logo {
  width: 38px;
  height: auto;
  display: block;
  transform: rotate(-90deg);
  opacity: 0.55;
}

/* Mobile : bande horizontale en haut */
@media (max-width: 768px) {
  .side-nav {
    top: 0;
    right: 0;
    left: 0;
    bottom: auto;
    width: 100%;
    height: 50px;
    flex-direction: row;
    padding: 0 16px;
    justify-content: space-between;
    border-left: none;
    border-bottom: 1px solid rgba(30, 27, 24, 0.12);
  }

  .side-top {
    padding: 0;
    border-bottom: none;
    border-right: 1px solid rgba(30, 27, 24, 0.1);
    padding-right: 16px;
    height: 100%;
    align-items: center;
  }

  .side-logo {
    width: 30px;
  }

  .side-links {
    flex-direction: row;
    gap: 0;
    flex: 1;
    justify-content: center;
  }

  .side-link {
    writing-mode: horizontal-tb;
    font-size: 0.58rem;
    padding: 0 10px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .side-bottom {
    padding: 0;
    border-top: none;
    border-left: 1px solid rgba(30, 27, 24, 0.1);
    padding-left: 16px;
    height: 100%;
    align-items: center;
  }

  .side-bottom-logo {
    transform: none;
    width: 28px;
    opacity: 0.5;
  }
}
</style>
