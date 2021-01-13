<template>
  <form onsubmit.prevent>
    <label>Rechercher: </label>
    <input type="text" v-model="nom" @input="load" />
    <label for="orderBy">Trier par</label>
    <select id="orderBy" v-model="tri" @change="load">
      <option value="">aucun tri</option>
      <option value="asc">prix croissant</option>
      <option value="desc">prix décroissant</option>
      <option value="nom">nom</option>
    </select>
  </form>

  <p>{{ articles.length }} Resultat(s) pour: {{ nom }}</p>
  <div class="articles">
    <div v-for="article in articles" :key="article.id">
      <CatalogueItem :article="article"/>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import CatalogueItem from "@/components/CatalogueItem";
export default {
  name: "Catalogue",
  components: {CatalogueItem},
  setup() {
    const articles = ref([]);
    const nom = ref("");
    const tri = ref("");

    const load = function () {
      let query = "http://localhost:4040/articles";
      if (nom.value) query += `?nom=${nom.value}`;
      if (tri.value !== "" ) query += `?orderBy=${tri.value}`
      fetch(query).then((response) => {
        response.json().then((data) => (articles.value = data.data));
      });
    };

    onMounted(() => {
      load();
    });

    return { articles, nom, load, tri };
  },
};
</script>

<style lang="scss">
.articles{
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>