<template>
    <div class="a-propos">
    <figure class="polaroid">
      <img src="https://cdn.sanity.io/images/w6f4ec13/production/7c54b1bf9c7db834fd7ce03c16144b1906731297-4032x3024.jpg?w=250" alt="album cover" />
      <figcaption class="caption">serie A-75 exp</figcaption>
    </figure>
    <p>
      Ici, les albums ne sont pas vraiment chroniqués : ils sont vécus, hantés, rejoués en boucle jusqu’à ce qu’un sens émerge — ou disparaisse.<br><br>
    Chaque texte est moins une critique qu’un fragment de récit.<br>
    Une nouvelle impressionniste, née entre une écoute tardive et une image mentale persistante.<br>
    Comme si chaque disque venait réveiller une scène oubliée : un couloir d’hôtel, une station-service au crépuscule, un rêve sous la lumière bleue d’un vieux néon.<br><br>

    Nous pensons la critique musicale comme un genre narratif à part entière.<br>
    Un terrain d’expérimentation.<br>
    Chaque album devient un déclencheur : de fiction, de mémoire, de cinéma intérieur.<br><br>

    On y croise aussi des éclats de visions presque hallucinées, qui n’ont plus rien à voir avec des recommandations culturelles.<br><br>

    Ce site ne classe pas. Il déplie.<br>
    Il ouvre des portes.<br><br>

    Une collection de chroniques-fiction, pour lecteurs curieux, insomniaques, obsessionnels — ou simplement prêts à écouter un disque comme on lirait un film incompris et inoubliable.
      <br><br>
Et si tu regardes, tu entendras</p>
    </div>
  </template>  

<style>
  .a-propos {
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 20px;
    line-height: 1.6;
    font-family: "Fira Sans", serif;
    font-size: 1rem;
    color: #333;
    position: relative;
    font-style: italic;
}

.a-propos p {
  position: relative;
  z-index: 2;
}

/* Polaroid */
.polaroid {
  width: 250px;
  background: white;
  padding: 10px 10px 30px 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  text-align: center;
  position: absolute;
  left: 10%; /* déborde sur le texte */
  top: 50%;    /* ajuste selon ton goût */
  transform: rotate(-5deg); /* effet travers */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1;
  opacity: 0.75;
}

.polaroid img {
  width: 100%;
  display: block;
  border-radius: 2px;
}

.caption {
  margin-top: 8px;
  font-size: 0.85rem;
  color: #333;
  font-family: "Fira Sans Extra Condensed", sans-serif;
}

.polaroid:hover {
  transform: rotate(-3deg) scale(1.05);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}
.a-propos p::first-letter {
  float:left;
  font-size: 4rem; /* Taille de la lettrine */
  font-family: "DM Serif Text", serif;
  line-height: 0.8;
  padding-right: 8px;
  padding-top: 8px;
  font-weight: 100;
}
</style>