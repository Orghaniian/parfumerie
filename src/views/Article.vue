<template>
  Article: {{ no }}
  <p v-if="article">{{ article }}</p>
  <p v-else>Chargement...</p>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "Article",
  props: ["no"],
  setup (props) {
    const article = ref(null)

    onMounted(() => {
      fetch("http://localhost:4040/article/" + props.no).then((response) => {
        response.json().then((data) => (article.value = data.data));
      })
    })

    return { article }
  }
}
</script>

<style scoped>

</style>