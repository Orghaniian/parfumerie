<template>
  Commande: {{ no }}
  {{ commande }}
  <div v-if="!modif">
    <p v-if="commande">{{ commande }}</p>
    <p v-else>Chargement...</p>
    <button @click="modif = !modif">Modifier</button>
  </div>


  <div v-else>
    <p> Commande numero : </p>
    <p> Date : </p>
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
    <button type="submit">Valider</button>
  </form>
  <p v-if="codeCommandeModifie">Commande modifié ! n°{{ codeCommandeModifie }}</p>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "Commande",
  props: ["id"],
  setup (props) {
    document.title = `Commande`
    const commande = ref(null)
    const modif = ref (false)
    const codeCommandeModifie = ref(null)

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

    return {  handleSubmit, commande, modif, codeCommandeModifie }
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