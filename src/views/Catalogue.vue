<template>
  <h2>Catalogue</h2>
  <label>Rechercher: </label>
  <input type="text" v-model="nom" @input="test" />
  <p>Resultat(s) pour: {{ nom }}</p>
  <div v-for="article in articles" :key="article.id">
    <pre>{{ article }}</pre>
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

    const test = function () {
      load();
    };

    onMounted(() => {
      load();
    });

    return { articles, nom, test };
  },
};
</script>

<style>
</style>