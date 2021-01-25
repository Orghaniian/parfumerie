<template>
  <div v-if="panier.length > 0" >
    <div class="card-container">
      <div v-for="(article, index) in panier" :key="article.no">
        <PanierItem :article="article" :index="index" @remove="removeFromCart"/>
      </div>
    </div>
    <p>Prix total: {{ total }} Points</p>
    <p>Frais de livraison: {{ frais_livraison }}</p>
  </div>
  <p v-else>Le panier est vide <router-link :to="{ name: 'Catalogue' }">Voir le catalogue</router-link> </p>

  <div @click="passerCommande" class="btn" style="width: 180px;margin: auto">Passer la commande</div>

</template>

<script>
import useCart from "@/utils/useCart";
import PanierItem from "@/components/PanierItem";
import {computed} from "vue";

export default {
  name: "Panier",
  components: {PanierItem},

  setup () {
    document.title = `Panier`
    const { panier, setCart } = useCart()
    const frais_livraison = 2.3

    const removeFromCart = function (index){
      panier.value.splice(index, 1)
      setCart(panier.value)
    }

    const total = computed(() => {
      let somme = 0
      panier.value.forEach(article => {
        somme += article.quantite * article.prixUnit
      })
      return somme
    })

    const passerCommande = function (){
      const client = JSON.parse(localStorage.getItem("utilisateur"))
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const options = {
        method: "POST",
        body: JSON.stringify({
          prix: total.value,
          frais_livraison,
          code_client: client.CodeClient,
          articles: panier.value
        }),
        headers: myHeaders
      }

      fetch("http://localhost:4040/commande", options)
          .then((reponse) => reponse.json().then(() => {
            panier.value = []
            setCart(panier.value)
          }))
    }



    return { panier, removeFromCart, passerCommande, total, frais_livraison }
  }
}
</script>