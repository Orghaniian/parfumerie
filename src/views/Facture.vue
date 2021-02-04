<template>
  Facture: {{ id }}
  {{ facture }}
    <p v-if="facture">{{ facture }}</p>
    <p v-else>Chargement...</p>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "Facture",
  props: ["id"],
  setup (props) {
    document.title = `Facture`
    const facture = ref(null)


    onMounted(() => {
      fetch("http://localhost:4040/facture/" + props.id)
      .then((response) => { response.json().then((data) => {
          facture.value = data.data
          document.title = `Facture - ${facture.value.no_facture}`
        });
      })
    })


    

    return { facture }
  }
}
</script>


<style lang="scss" scoped>
  .clients{
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>