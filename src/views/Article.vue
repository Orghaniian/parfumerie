<template>
  Article: {{ no }}
  <div v-if="article">
    <pre>{{ article }}</pre>
    <p v-if="article.Quantite_en_stock <= 0">Stock épuisé!</p>
    <label for="quantite">Quantité: </label>
    <input type="number" min="0"  id="quantite" v-model="quantite"/>
    <button :disabled="article.Quantite_en_stock <= 0" @click.prevent="addCart">{{ article ? "Ajouter au panier" : "Chargement..." }}</button>
  </div>
  <p v-else>Chargement...</p>
  <p v-if="erreur">{{ erreur }}</p>


</template>

<script>
import {onMounted, ref} from "vue";
import useCart from "@/utils/useCart"

export default {
  name: "Article",
  props: ["no"],
  setup (props) {
    document.title = `Article`
    const article = ref(null)

    onMounted(() => {
      fetch("http://localhost:4040/article/" + props.no).then((response) => {
        response.json().then((data) => {
          article.value = data.data
          document.title = `Article - ${article.value.Nom}`
        });
      })
    })

    const { panier, setCart } = useCart();
    const quantite = ref(0)
    const erreur = ref(null)

    const addCart = function (){
      erreur.value = null
      if(typeof quantite.value === "string")
        quantite.value = parseInt(quantite.value)
      if(quantite.value > 0){
        if(quantite.value <= article.value.Quantite_en_stock){
          let alreadyIn = false
          panier.value.forEach(article => {
            if( article.no === props.no){
              article.quantite += quantite.value
              alreadyIn = true
            }
          })
          if(!alreadyIn)
            panier.value.push({ no: props.no, quantite: quantite.value,prixUnit:  article.value.Prix_unitaire})
          setCart(panier.value)
        }
        else erreur.value = `Il ne reste que ${article.value.Quantite_en_stock} exemplaires en stock`
      }else erreur.value = "Veuillez selectionner une quantité supérieur à 0"


    }

    return { article, addCart, quantite, erreur }
  }
}
</script>

<style scoped>

</style>