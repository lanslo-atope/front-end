<template>
  <div class="a-propos">
    <figure class="polaroid">
      <img src="https://cdn.sanity.io/images/w6f4ec13/production/7c54b1bf9c7db834fd7ce03c16144b1906731297-4032x3024.jpg?w=250" alt="album cover" />
      <figcaption class="caption">serie A-75 exp</figcaption>
    </figure>
    <p>
      Ici, les albums ne sont pas vraiment chroniqués : ils sont vécus, hantés, rejoués en boucle jusqu'à ce qu'un sens émerge — ou disparaisse.<br>
      Chaque texte est moins une critique qu'un fragment de récit.<br>
      Une nouvelle impressionniste, née entre une écoute tardive et une image mentale persistante.<br>
      Comme si chaque disque venait réveiller une scène oubliée : un couloir d'hôtel, une station-service au crépuscule, un rêve sous la lumière bleue d'un vieux néon.<br>
      Nous pensons la critique musicale comme un genre narratif à part entière.<br>
      Un terrain d'expérimentation.<br>
      Chaque album devient un déclencheur : de fiction, de mémoire, de cinéma intérieur.<br>
      On y croise aussi des éclats de visions presque hallucinées, qui n'ont plus rien à voir avec des recommandations culturelles.<br>
      Ce site ne classe pas. Il déplie.<br>
      Il ouvre des portes.<br>
      Une collection de chroniques-fiction, pour lecteurs curieux, insomniaques, obsessionnels — ou simplement prêts à écouter un disque comme on lirait un film incompris et inoubliable.
      <br><br><strong>Si tu lis, tu entendras</strong>
    </p>

    <div v-if="latest && latest.length" class="latest">
      <NuxtLink
        v-for="item in latest"
        :key="item._id"
        :to="`/albums/${item.slug.current}`"
        class="latest-item"
      >
        <span class="latest-title">{{ item.title }}</span>
        <span v-if="item.stitle" class="latest-artist">{{ item.stitle }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useSanity } from '~/composables/useSanity'

const client = useSanity()

const { data: latest } = await useAsyncData('latest', () =>
  client.fetch(`
    *[_type == "article" && category == "albums"] | order(date desc)[0..2] {
      _id, title, stitle, slug
    }
  `)
)
</script>

<style>
.a-propos {
  max-width: 680px;
  margin: 0 auto;
  padding: 70px 20px 100px;
  line-height: 1.65;
  font-family: "Fira Sans", serif;
  font-size: 1rem;
  color: var(--ink-mid);
  position: relative;
  font-style: italic;
}

.a-propos p {
  position: relative;
  z-index: 2;
}

.a-propos strong {
  font-family: "DM Serif Text", serif;
  font-size: 1.05rem;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.01em;
  color: var(--ink);
}

/* Polaroid */
.polaroid {
  width: 140px;
  background: white;
  padding: 8px 8px 18px 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  text-align: center;
  position: absolute;
  left: -22%;
  top: 18%;
  transform: rotate(-5deg);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  z-index: 1;
  opacity: 0.7;
}

.polaroid img {
  width: 100%;
  display: block;
  border-radius: 1px;
}

.caption {
  margin-top: 8px;
  font-size: 0.78rem;
  color: var(--ink-soft);
  font-family: "Fira Sans", sans-serif;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0.03em;
}

.polaroid:hover {
  transform: rotate(-2deg) scale(1.04);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
}

.a-propos p::first-letter {
  float: left;
  font-size: 4.2rem;
  font-family: "DM Serif Text", serif;
  line-height: 0.78;
  padding-right: 8px;
  padding-top: 10px;
  font-weight: 100;
  color: #222;
}

/* Dernières chroniques */
.latest {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  padding-top: 28px;
}

.latest-item {
  display: flex;
  align-items: baseline;
  gap: 10px;
  text-decoration: none;
  font-style: normal;
  transition: opacity 0.25s ease;
}

.latest-item:hover {
  opacity: 0.5;
}

.latest-title {
  font-family: "DM Serif Text", serif;
  font-style: italic;
  font-size: 0.95rem;
  color: var(--ink-mid);
}

.latest-artist {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.78rem;
  font-weight: 300;
  color: var(--ink-muted);
}
</style>
