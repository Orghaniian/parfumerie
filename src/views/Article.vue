<template>
  Article: {{ no }}
  {{ article }}
  <div v-if="!modif">
    <pre>{{ article }}</pre>
    <p v-if="article">{{ article }}</p>
    <p v-if="article.Quantite_en_stock <= 0">Stock épuisé!</p> 
    <label for="quantite">Quantité: </label>
    <input type="number" min="0"  id="quantite" v-model="quantite"/>
    <button :disabled="article.Quantite_en_stock <= 0" @click.prevent="addCart">{{ article ? "Ajouter au panier" : "Chargement..." }}</button>
  </div>
  <p v-else>Chargement...</p>
  <button @click="modif = !modif">Modifier</button>
  <p v-if="erreur">{{ erreur }}</p>


  <div v-else>
    <p>Article numero : </p>
    <form @submit.prevent="handleSubmit">
    <div>
      <label for="nom">Nom</label>
      <input type="text" name="nom" id="nom" v-model="article.nom" required/>
    </div>
    <div>
      <label for="quantite">Quantité</label>
      <input type="number" name="quantite" id="quantite" v-model="article.quantite_en_stock" required/>
    </div>
    <div>
      <label for="prix">Prix</label>
      <input type="number" step="0.01" name="prix" id="prix" v-model="article.prix_unitaire" required/>
    </div>
    <div>
      <label for="disponible">Disponible</label>
      <input type="checkbox" name="disponible" id="disponible" v-model="article.disponible"/>
    </div>
    <div>
      <label for="cadeau">En cadeau</label>
      <input type="checkbox" name="cadeau" id="cadeau" v-model="article.en_cadeau"/>
    </div>
    <div>
      <label for="echangeable">Échangeable</label>
      <input type="checkbox" name="echangeable" id="echangeable" v-model="article.echangeable" />
    </div>
    <button type="submit">Modifier</button>
  </form>
  <p v-if="codeArticleModifie">Article modifié ! n°{{ codeArticleModifie }}</p>
  </div>
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
    const modif = ref (false)
    const codeArticleModifie = ref(null)

    const handleSubmit = function () {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const options = {
            method: "PUT",
            body: JSON.stringify({ ...article.value }),
            headers: myHeaders
        }

        fetch("http://localhost:4040/article/" + props.id, options)
            .then((reponse) => reponse.json().then((data) => {
              codeArticleModifie.value = data.data
              document.title = `Article - ${article.value.Nom}`
            }))
    }

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

    return { handleSubmit, article, addCart, quantite, erreur, modif, codeArticleModifie }
  }
}
</script>

<style scoped>

</style>