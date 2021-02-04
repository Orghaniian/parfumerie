<template>
<div v-if="!admin">
  <router-link :to="{ name: 'Catalogue' }">Voir le catalogue</router-link>
  <br/>
  <br/>
</div>
<div v-else>
  <router-link :to="{ name: 'Ajouter' }">Ajouter un cadeau</router-link>
  <br/>
  <br/>
  <router-link :to="{ name: 'Clients' }">Voir les clients</router-link>
  <br/>
  <br/>
  <router-link :to="{ name: 'Commandes' }">Voir les commandes</router-link>
  <br/>
  <br/>
</div>
  
  
</template>

<script>
import {computed} from "vue";
import isAdmin from "@/utils/isAdmin";
export default {
  name: "Accueil",
  setup() {
    document.title = `Lalavande`

    const admin = computed(() => isAdmin())

    return {admin}
  },
};
</script>
