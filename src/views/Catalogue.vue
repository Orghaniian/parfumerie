<template>
  <SearchBar @load="load" :select-options="{
    asc: 'prix croissant',
    desc: 'prix décroissant',
    nom: 'nom',
    stock: 'en stock uniquement'
  }"/>
  <p>{{ articles.length }} Resultat(s) pour: {{ nomRef }}</p>
  <div class="card-container">
    <div v-for="article in articles" :key="article.id">
      <CatalogueItem :article="article"/>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import CatalogueItem from "@/components/CatalogueItem";
import SearchBar from "@/components/SearchBar";
export default {
  name: "Catalogue",
  components: {SearchBar, CatalogueItem},
  setup() {
    const articles = ref([]);
    const nomRef = ref("")

    const load = function (e = {}) {
      const { tri, nom } = e
      nomRef.value = nom
      let query = "http://localhost:4040/articles?";
      if (nom && nom !== "" ) query += `&nom=${nom}`;
      if (tri && tri == "stock") query += `&stock=true`
      else if (tri && tri !== "") query += `&orderBy=${tri}`
      fetch(query).then((response) => {
        response.json().then((data) => (articles.value = data.data));
      });
    };

    onMounted(() => {
      load();
    });

    return { articles, load, nomRef};
  },
};
</script>