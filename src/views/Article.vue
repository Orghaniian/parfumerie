<template>
  Article: {{ no }}
  <p v-if="article">{{ article }}</p>
  <p v-else>Chargement...</p>
  <label for="quantite"></label>
  <input type="number" min="0"  id="quantite" v-model="quantite"/>
  <button @click.prevent="addCart">{{ article ? "Ajouter au panier" : "Chargement..." }}</button>
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

    const addCart = function (){
      if(typeof quantite.value === "string")
        quantite.value = parseInt(quantite.value)
      if(quantite.value > 0){
        let alreadyIn = false
        panier.value.forEach(article => {
          if( article.no === props.no){
            article.quantite += quantite.value
            alreadyIn = true
          }
        })
        if(!alreadyIn)
          panier.value.push({ no: props.no, quantite: quantite.value })
        setCart(panier.value)
      }
    }

    return { article, addCart, quantite }
  }
}
</script>

<style scoped>

</style>