<template>
  <SearchBar @load="load" :select-options="{
    asc: 'date croissant',
    desc: 'date décroissant',
    num: 'numero'
  }">

    
  </SearchBar>
  <p>{{ commandes.length }} Resultat(s) pour: {{ numRef }}</p>
  <div class="card-container">
    <div v-for="commande in commandes" :key="commande.id">
      <CommandesItem :commande="commande"/>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import CommandesItem from "@/components/CommandesItem ";
import SearchBar from "@/components/SearchBar";
export default {
  name: "Commandes",
  components: {SearchBar, CommandesItem },
  setup() {
    const commandes = ref([]);
    const numRef = ref("")

    const load = function (e = {}) {
      const { tri, num } = e
      numRef.value = num
      let query = "http://localhost:4040/commandes?";
      if (num && num !== "" ) query += `&no_commande=${num}`;
      if (tri && tri !== "") query += `&orderBy=${tri}`
      fetch(query).then((response) => {
        response.json().then((data) => (commandes.value = data.data));
      });
    };

    onMounted(() => {
      load();
    });

    return { commandes, load, numRef};
  },
};
</script>