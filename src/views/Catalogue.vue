<template>
  <SearchBar @load="load" :select-options="{
    asc: 'prix croissant',
    desc: 'prix décroissant',
    nom: 'nom'
  }">
    <label for="enStock">En stock uniquement</label>
    <input @change="load" type="checkbox" name="enStock" id="enStock" v-model="enStock">
    <label for="echangeable">Article échangeable en points</label>
    <input @change="load" type="checkbox" name="echangeable" id="echangeable" v-model="echangeable">
    <label for="enCadeau">Obtenable en cadeau</label>
    <input @change="load" type="checkbox" name="enCadeau" id="enCadeau" v-model="enCadeau">
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
    const echangeable = ref(false)
    const enCadeau = ref(false)

    const load = function (e = {}) {
      const { tri, nom } = e
      nomRef.value = nom
      let query = "http://localhost:4040/articles?";
      if (nom && nom !== "" ) query += `&nom=${nom}`;
      if (enStock.value) query += `&stock=true`
      if (echangeable.value) query += `&echangeable=true`
      if (enCadeau.value) query += `&cadeau=true`
      if (tri && tri !== "") query += `&orderBy=${tri}`
      fetch(query).then((response) => {
        response.json().then((data) => (articles.value = data.data));
      });
    };

    onMounted(() => {
      load();
    });

<<<<<<< HEAD
    return { articles, load, nomRef, enStock, echangeable, enCadeau};
=======
    const admin = computed(() => isAdmin())

    return { articles, load, nomRef, enStock, admin};
>>>>>>> ab924d606992bc9078c9b912f0fda92ac74eeeef
  },
};
</script>