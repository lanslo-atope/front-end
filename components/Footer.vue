<template>
  <footer class="site-footer">
    <div class="footer-content">
        <!-- Copyright -->
      <div class="content-left">
        <p>© {{ new Date().getFullYear() }} Te Voilà Bien Consumé — Tous droits réservés</p>
      </div>
    
      <!-- Newsletter -->
      <div class="content-right">
      <div class="newsletter">
        <form @submit.prevent="subscribe">
          <input
            type="email"
            placeholder="Ton email"
            v-model="email"
            required
          />
          <button type="submit">S’inscrire</button>
        </form>
      </div>

      <!-- Switch Nuit/Jour -->
      <div class="theme-switch">
        <label>
          <input type="checkbox" v-model="darkMode" @change="toggleTheme" />
          <span>{{ darkMode ? '🌙 Nuit' : '☀️ Jour' }}</span>
        </label>
      </div>
    </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const darkMode = ref(false)

function subscribe() {
  alert(`Merci ${email.value}, tu es inscrit !`)
  email.value = ''
}

function toggleTheme() {
  document.documentElement.classList.toggle('dark', darkMode.value)
}
</script>

<style scoped>
.site-footer {
  padding: 20px;
  font-size: 0.9rem;
  border-top: 1px solid var(--line-strong);
}

.footer-content {
  display: flex;
  justify-content: space-between; /* Colle gauche/droite */
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  font-family: "Fira Sans", sans-serif;
  font-weight: 400;
  font-size: 0.7rem;
  color: var(--ink-mid);
  width: 100%;
}

.content-left {
  margin-right: auto; /* Colle tout à gauche */
}

.content-right {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto; /* Colle tout à droite */
}

.newsletter h3 {
  margin: 0 0 8px;
  font-size: 1rem;
}

.newsletter form {
  display: flex;
  gap: 10px;
}

.newsletter input {
  padding: 6px 10px;
  border: 1px solid var(--ink-ghost);
  border-radius: 4px;
}

.newsletter button {
  background: var(--accent);
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.footer-meta {
  flex: 1;
  text-align: center;
  font-size: 0.85rem;
}

.theme-switch {
  font-size: 0.85rem;
}
/* --- Responsive --- */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column; /* empile les éléments */
    align-items: center;    /* centre horizontalement */
    text-align: center;
  }

  .content-left,
  .content-right {
    margin: 0; /* enlève les marges auto */
  }

  .content-right {
    flex-direction: column; /* newsletter au-dessus du switch */
    gap: 10px;
  }

  .newsletter form {
    flex-direction: column; /* input au-dessus du bouton */
    gap: 10px;
  }

  .newsletter input,
  .newsletter button {
    width: 100%; /* prend toute la largeur en mobile */
  }
}
</style>
