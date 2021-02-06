<template>
  Article: {{ no }}
  <div v-if="article">
    <div v-if="!modif">
      <div class="card-container">
          <ArticleItem :article="article"/>
      </div>
      <br/>
      <br/>
      <p v-if="article.Quantite_en_stock <= 0">Stock épuisé!</p>
      <div v-if="!admin">
        <label for="quantite">Quantité: </label>
        <input type="number" min="0"  id="quantite" v-model="quantite"/>
        <button :disabled="article.Quantite_en_stock <= 0" @click.prevent="addCart">{{ article ? "Ajouter au panier" : "Chargement..." }}</button>
      </div>
      <div v-else>
          <button class="btn" @click="modif = !modif">Modifier</button>
          <button class="btn" @click="fonctionSupp()">Supprimer</button>
      </div>
    </div>
    <div v-else>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="nom">Nom</label>
          <input type="text" name="nom" id="nom" v-model="article.Nom" required/>
        </div>
        <div>
          <label for="quantite">Quantité</label>
          <input type="number" name="quantite" id="quantite" v-model="article.Quantite_en_stock" required/>
        </div>
        <div>
          <label for="prix">Prix</label>
          <input type="number" step="0.01" name="prix" id="prix" v-model="article.Prix_unitaire" required/>
        </div>
        <div>
          <label for="disponible">Disponible</label>
          <input type="checkbox" name="disponible" id="disponible" v-model="article.Disponible"/>
        </div>
        <div>
          <label for="cadeau">En cadeau</label>
          <input type="checkbox" name="cadeau" id="cadeau" v-model="article.En_cadeau"/>
        </div>
        <div>
          <label for="echangeable">Échangeable</label>
          <input type="checkbox" name="echangeable" id="echangeable" v-model="article.Echangeable" />
        </div>
        <div>
          <label for="image">Image</label>
          <input type="text" name="image" id="image" v-model="form.image" required/>
        </div>
        <button class="btn" type="submit">Valider</button>
      </form>
      <p v-if="codeArticleModifie">Article modifié ! n°{{ codeArticleModifie }}</p>
    </div>
  </div>
  <p v-else>Chargement...</p>
  <p v-if="erreur">{{ erreur }}</p>


</template>

<script>
import {computed, onMounted, ref} from "vue";
import ArticleItem from "@/components/ArticleItem";
import useCart from "@/utils/useCart";
import isAdmin from "@/utils/isAdmin";
import {useRouter} from "vue-router";

export default {
  name: "Article",
  props: ["no"],
  components: {ArticleItem},
  setup (props) {
    console.log(props)
    document.title = `Article`
    const article = ref(null)
    const modif = ref (false)
    const codeArticleModifie = ref(null)
    const router = useRouter()


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

    const fonctionSupp = function () {
        fetch(`http://localhost:4040/article/${props.no}`, { method: "DELETE" }).then( () => {
          router.push({name: "Catalogue"})
        })
    }

    const handleSubmit = function () {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const options = {
        method: "PUT",
        body: JSON.stringify({ ...article.value }),
        headers: myHeaders
      }


      fetch("http://localhost:4040/article/" + props.no, options)
          .then((reponse) => reponse.json().then((data) => {
            codeArticleModifie.value = data.data
          }))
    }

    const admin = computed(() => isAdmin())

    return { fonctionSupp, article, addCart, quantite, erreur, modif, handleSubmit, codeArticleModifie, admin}
  }
}
</script>

<style scoped>

.btn {
    height: 35px;
    padding: 4px 10px;
    background: #FFFFFF;
    border: 2px solid #483D8B;
    border-radius: 20px;
    text-decoration: none;
    line-height: 23px;
    justify-self: center;
    color: black;
    cursor: pointer;
    text-align: center;
}

</style>