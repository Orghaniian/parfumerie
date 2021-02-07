<template>
 <router-link class="btn" :to="{ name: 'Ajouter' }" v-if="admin">
    Ajouter un nouvel article
  </router-link>
  <br/>
  <br/>
  <br/>
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
    <div v-if="admin">
      <label for="disponible">Disponibles</label>
      <input @change="load" type="checkbox" name="disponible" id="disponible" v-model="disponible">
    </div>
  </SearchBar>
  
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
    const disponible = ref(true)

    const load = function (e = {}) {
      const { tri, nom } = e
      nomRef.value = nom
      let query = "http://localhost:4040/articles?";
      if (nom && nom !== "" ) query += `&nom=${nom}`;
      if (enStock.value) query += `&stock=true`
      if (echangeable.value) query += `&echangeable=true`
      if (enCadeau.value) query += `&cadeau=true`
      if (disponible.value) query += `&disponible=true`
      if (tri && tri !== "") query += `&orderBy=${tri}`
      console.log(query, disponible.value)
      fetch(query).then((response) => {
        response.json().then((data) => (articles.value = data.data));
      });
    };

    onMounted(() => {
      load();
    });

    const admin = computed(() => isAdmin())    

    return { articles, load, nomRef, enStock, echangeable, enCadeau, admin, disponible};
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