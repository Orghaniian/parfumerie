<template>
  <router-link :to="{ name: 'Catalogue' }">Voir le catalogue</router-link>
  <router-link :to="{ name: 'Ajouter' }">Ajouter un cadeau</router-link>
  <router-link :to="{ name: 'Clients' }">Voir les clients</router-link>
  <router-link :to="{ name: 'Inscrire' }">Inscrire un client</router-link>
  <router-link to="/">Paramètres</router-link>
</template>

<script>
export default {
  name: "Accueil",
  setup() {},
};
</script>
