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
  <div style="color: red">{{ error }}</div>
  <button @click="passerCommande" class="btn" style="width: 180px;margin: auto">Passer la commande</button>

</template>

<script>
import useCart from "@/utils/useCart";
import PanierItem from "@/components/PanierItem";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

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

    const error = ref(null)
    const router = useRouter()

    const passerCommande = async function (){
      console.log("passer commande")
      error.value = null
      const client = JSON.parse(localStorage.getItem("utilisateur"))
      try{
        //vérification solde
        let response = await fetch(`http://localhost:4040/client/${client.CodeClient}`)
        const repsonseClient = await response.json()
        if (repsonseClient.status !== 200)
          throw new Error(`Erreur lors de la récupération des données du client n° ${client.CodeClient}: ${repsonseClient.message}`)

        if( repsonseClient.data.Points >=  total.value){
          //ajout commande
          let myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          let options = {
            method: "POST",
            body: JSON.stringify({
              prix: total.value,
              frais_livraison,
              code_client: client.CodeClient,
              articles: panier.value
            }),
            headers: myHeaders
          }
          response = await fetch("http://localhost:4040/commande", options)
          const responseCommande = await response.json()
          if (repsonseClient.status !== 200)
            throw new Error(`Erreur lors de l'envoi de la commande: ${responseCommande.message}`)

          panier.value = []
          setCart(panier.value)
          router.push("/")
        }else{
          error.value = "Vous n'avez pas suffisamment de points"
          console.log("erreur: ", error.value)
        }
      }catch (e) {
        console.log("ERREUR: ", e)
        error.value = "Il y a eu une erreur du côté du serveur"
      }
    }



    return { panier, removeFromCart, passerCommande, total, frais_livraison, error }
  }
}
</script>