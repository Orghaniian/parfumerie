<template>
  <router-link :to="{ name: 'Catalogue' }">Voir le catalogue</router-link>
  <br/>
  <br/>
  <router-link :to="{ name: 'Ajouter' }">Ajouter un cadeau</router-link>
  <br/>
  <br/>
  <router-link :to="{ name: 'Clients' }">Voir les clients</router-link>
  <br/>
  <br/>
  <router-link to="/">Paramètres</router-link>
  <br/>
</template>

<script>
export default {
  name: "Accueil",
  setup() {
    document.title = `Lalavande`
  },
};
</script>
