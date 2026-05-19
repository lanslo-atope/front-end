<template>
  <div class="archive-page">
    <header class="archive-header">
      <h1 class="archive-title">Livres</h1>
    </header>
    <p class="archive-preamble">Fragments de lecture, annotations mentales, phrases restées coincées quelque part.</p>

    <p v-if="pending" class="state-msg">Chargement…</p>
    <p v-else-if="error" class="state-msg">Erreur : {{ error.message }}</p>

    <div v-else>
      <div v-if="!data || data.length === 0" class="archive-empty">
        <p>Archive en construction.<br>Les chroniques arrivent.</p>
      </div>

      <ul v-else class="archive-list">
        <li
          v-for="(article, i) in data"
          :key="article._id"
          class="archive-item"
        >
          <span class="archive-index">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="archive-item-body">
            <div class="archive-item-title">{{ article.title }}</div>
            <div class="archive-item-meta">
              <span v-if="article.stitle">{{ article.stitle }}</span>
              <span v-if="article.stitle && article.date" class="sep">·</span>
              <span v-if="article.date" class="archive-item-date">{{ formatDate(article.date) }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useSanity } from '~/composables/useSanity'

const client = useSanity()

const { data, pending, error } = await useAsyncData('books', () =>
  client.fetch(`
    *[_type == "article" && category == "books"]{
      _id,
      title,
      stitle,
      date,
      slug,
      "image": image.asset->url
    } | order(date desc)
  `)
)

function formatDate(dateString) {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('fr-FR', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}
</script>

<style scoped>
.archive-page {
  max-width: 700px;
  padding: 60px 20px 80px;
}

.archive-header {
  margin-bottom: 36px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line-strong);
}

.archive-title {
  font-family: "DM Serif Text", serif;
  font-weight: 400;
  font-style: italic;
  font-size: 2.4rem;
  color: var(--ink);
  letter-spacing: -0.02em;
  line-height: 1;
}

.archive-preamble {
  max-width: 420px;
  font-family: "Fira Sans", sans-serif;
  font-style: italic;
  font-weight: 300;
  font-size: 0.9rem;
  line-height: 1.75;
  color: #777;
  margin-bottom: 60px;
}

.archive-list {
  list-style: none;
}

.archive-item {
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line-soft);
  transition: opacity 0.2s ease;
}

.archive-item:hover {
  opacity: 0.7;
}

.archive-index {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.75rem;
  font-weight: 300;
  color: var(--ink-ghost);
  letter-spacing: 0.04em;
  flex-shrink: 0;
  min-width: 24px;
}

.archive-item-body {
  flex: 1;
}

.archive-item-title {
  font-family: "DM Serif Text", serif;
  font-style: italic;
  font-size: 1.15rem;
  color: var(--ink);
  line-height: 1.3;
}

.archive-item-meta {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.82rem;
  font-weight: 300;
  color: var(--ink-soft);
  margin-top: 4px;
  display: flex;
  gap: 6px;
  align-items: center;
}

.archive-item-date {
  font-size: 10px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink-ghost);
}

.sep {
  color: var(--ink-ghost);
  font-size: 0.7rem;
}

.archive-empty {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.95rem;
  font-style: italic;
  color: var(--ink-muted);
  line-height: 1.8;
  padding: 20px 0;
}

.state-msg {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.9rem;
  color: var(--ink-muted);
  font-style: italic;
  padding: 20px 0;
}
</style>
