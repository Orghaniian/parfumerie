<template>
  Commande N°: {{ id }}
  <div v-if="!modif">
    <div v-if="commande">
      <p>Client: {{ commande.Code_client }}</p>
      <p>Date: {{ commande.Date_commande}}</p>
      <p>Prix total: {{ commande.Prix }}</p>
      <p>Frais de livraison: {{ commande.Frais_livraison }}</p>
      <p>Statut: {{ commande.Statut }}</p>
      <div v-for="article in commande.articles" :key="article.No_article">
        <router-link :to="{name: 'Article', params: { no: article.No_article }}">{{ article }}</router-link>
      </div>
    </div>
    <p v-else>Chargement...</p>
    <button class="btn" @click="modif = !modif">Modifier</button>
    <button class="btn" @click="fonctionSupp()">Supprimer</button>
  </div>


  <div v-else>
    <p> Commande numero : {{ commande.No_commande }}</p>
    <p> Date : {{ commande.Date_commande }}</p>
    <form @submit.prevent="handleSubmit">
    <div>
      <label for="prix">Prix</label>
      <input type="text" name="prix" id="prix" v-model="commande.Prix" required/>
    </div>
    <div>
      <label for="frais">Frais de livraison</label>
      <input type="text" name="frais" id="frais" v-model="commande.Frais_livraison" required/>
    </div>
    <div>
      <label for="statut">Statut</label>
      <input type="text" name="statut" id="statut" v-model="commande.Statut" required/>
    </div>
    <div>
      <label for="codeclient">Code client</label>
      <input type="text" name="codeclient" id="codeclient" v-model="commande.Code_client" required/>
    </div>
    <button class="btn" type="submit">Valider</button>
  </form>
  <p v-if="codeCommandeModifie">Commande modifié ! n°{{ codeCommandeModifie }}</p>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "Commande",
  props: ["id"],
  setup (props) {
    document.title = `Commande`
    const commande = ref(null)
    const modif = ref (false)
    const codeCommandeModifie = ref(null)
    const router = useRouter()

    const handleSubmit = function () {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const options = {
            method: "PUT",
            body: JSON.stringify({ ...commande.value }),
            headers: myHeaders
        }

        fetch("http://localhost:4040/commande/" + props.id, options)
            .then((reponse) => reponse.json().then((data) => {
              codeCommandeModifie.value = data.data
              document.title = `Commande - ${commande.value.No_commande}`
              modif.value =false
            }))
    }

    onMounted(() => {
      fetch("http://localhost:4040/commande/" + props.id)
      .then((response) => { response.json().then((data) => {
          commande.value = data.data
          document.title = `Commande - ${commande.value.No_commande}`
        });
      })
    })

    const fonctionSupp = function () {
        fetch(`http://localhost:4040/commande/${props.id}`, { method: "DELETE" }).then( () => {
          router.push({name: "Commandes"})
        })
    }

    return {  handleSubmit, fonctionSupp, commande, modif, codeCommandeModifie }
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