<template>
  <h2>Catalogue</h2>
  <label>Rechercher: </label>
  <input type="text" v-model="nom" @input="load" />
  <p>Resultat(s) pour: {{ nom }}</p>
  <div v-for="article in articles" :key="article.id">
    <pre>{{ article }}</pre>
    <router-link :to="{ name: 'Article', params: { no: article.No_article } } ">Voir</router-link>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "Catalogue",
  setup() {
    const articles = ref([]);
    const nom = ref("");

    const load = function () {
      let query = "http://localhost:4040/articles";
      if (nom.value) query += `?nom=${nom.value}`;
      fetch(query).then((response) => {
        response.json().then((data) => (articles.value = data.data));
      });
    };

    onMounted(() => {
      load();
    });

    return { articles, nom, load };
  },
};
</script>

<style>
</style>