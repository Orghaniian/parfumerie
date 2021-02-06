<template>
  <h2>Facture: {{ no }} </h2>
    <p v-if="facture">{{ facture }}</p>
    <br/>
    <br/>
     <div v-if="commande">
         <h3>Commande</h3>
      <p>Client: {{ commande.Code_client }}</p>
      <p>Date: {{ commande.Date_commande}}</p>
      <p>Prix total: {{ commande.Prix }}</p>
      <p>Frais de livraison: {{ commande.Frais_livraison }}</p>
      <p>Statut: {{ commande.Statut }}</p>
      <div v-for="article in commande.articles" :key="article.No_article">
        {{ article }}
      </div>
    </div>
    <p v-else>Chargement...</p>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "Facture",
  props: ["no"],
  setup (props) {
    document.title = `Facture`
    const facture = ref(null)
    const commande= ref(null)
    
    console.log(props)

    onMounted(() => {
      fetch("http://localhost:4040/facture/" + props.no)
      .then((response) => { response.json().then((data) => {
          facture.value = data.data
          document.title = `Facture - ${facture.value.no_facture}`

          fetch("http://localhost:4040/commande/"+facture.value.Commande_No_commande)
          .then((response) => { response.json().then((data) => {
            commande.value = data.data

            
          });
          })
        });
      })
    })


    return { facture, commande }
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