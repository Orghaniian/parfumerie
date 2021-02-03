<template>
  <SearchBar @load="load" :select-options="{
    asc: 'prix croissant',
    desc: 'prix décroissant',
    nom: 'nom'
  }">
    <label for="enStock">En stock uniquement</label>
    <input @change="load" type="checkbox" name="enStock" id="enStock" v-model="enStock">
  </SearchBar>
  <router-link :to="{ name: 'Ajouter' }" v-if="admin">
    Ajouter un nouvel article
  </router-link>
  <p>{{ articles.length }} Resultat(s) pour: {{ nomRef }}</p>
  <div class="card-container">
    <div v-for="article in articles" :key="article.id">
      <CatalogueItem :article="article"/>
    </div>
  </div>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import CatalogueItem from "@/components/CatalogueItem";
import SearchBar from "@/components/SearchBar";
import isAdmin from "@/utils/isAdmin";
export default {
  name: "Catalogue",
  components: {SearchBar, CatalogueItem},
  setup() {
    const articles = ref([]);
    const nomRef = ref("")
    const enStock = ref(false)

    const load = function (e = {}) {
      const { tri, nom } = e
      nomRef.value = nom
      let query = "http://localhost:4040/articles?";
      if (nom && nom !== "" ) query += `&nom=${nom}`;
      if (enStock.value) query += `&stock=true`
      if (tri && tri !== "") query += `&orderBy=${tri}`
      fetch(query).then((response) => {
        response.json().then((data) => (articles.value = data.data));
      });
    };

    onMounted(() => {
      load();
    });

    const admin = computed(() => isAdmin())

    return { articles, load, nomRef, enStock, admin};
  },
};
</script>