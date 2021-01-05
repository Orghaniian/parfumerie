<template>Catalogue {{ articles.values }}</template>

<script>
import { ref } from "vue";
import fectchArticles from "../utils/fetchArticles";
// import connectDb from "../utils/connectDb";
export default {
  setup() {
    const articles = ref([]);
    // const db = connectDb;
    // console.log(db);

    fectchArticles();

    return { articles };
  },
};
</script>

<style>
</style>