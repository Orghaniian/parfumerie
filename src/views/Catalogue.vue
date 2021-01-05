<template>
  Catalogue
  <div v-for="article in articles" :key="article.id">
    <pre>{{ article }}</pre>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "Catalogue",
  setup() {
    const articles = ref([{ test: "test" }]);
    // const db = connectDb;
    // console.log(db);

    onMounted(() => {
      fetch("http://localhost:4040/articles").then((reponse) => {
        reponse.json().then((data) => (articles.value = data.data));
      });
    });

    return { articles };
  },
};
</script>

<style>
</style>