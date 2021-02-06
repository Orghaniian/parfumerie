<template>
<div v-if="!admin">
  <router-link class="btn" :to="{ name: 'Catalogue' }">Voir le catalogue</router-link>
  <br/>
  <br/>
</div>
<div v-else>
  <router-link class="btn" :to="{ name: 'Ajouter' }">Ajouter un cadeau</router-link>
  <br/>
  <br/>
  <router-link class="btn" :to="{ name: 'Clients' }">Voir les clients</router-link>
  <br/>
  <br/>
  <router-link class="btn" :to="{ name: 'Commandes' }">Voir les commandes</router-link>
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

<style>

  .btn {
    height: 35px;
    padding: 4px 10px;
    background: #FFFFFF;
    border: 2px solid #483D8B;
    border-radius: 20px;
    text-decoration: none;
    line-height: 23px;
    justify-self: center;
    color: black;
    cursor: pointer;
    text-align: center;
}
</style>