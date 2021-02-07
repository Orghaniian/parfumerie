<template>
  <div v-if="!controlled">
    <h2>Veuillez entrer le numéro du client dont vous souhaitez prendre contrôle</h2>
    <form @submit.prevent="takeControl">
      <div>
        <label for="nClient">Numéro de client: </label>
        <input type="number" name="nClient" id="nClient" v-model="nClient"/>
      </div>
      <p v-if="error" style="color: red">{{ error }}</p>
      <button type="submit" class="btn">Valider</button>
    </form>
  </div>
  <button class="btn" v-else @click="dropControl">
    Arrêter le contrôle
  </button>
</template>

<script>
import {ref} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "ControleClient",
  setup(){
    const nClient = ref("")
    const error = ref(null)

    const router = useRouter()
    const takeControl = function () {
      error.value = null
      fetch("http://localhost:4040/client/" + nClient.value)
          .then((response) => { response.json().then((data) => {
            if (data.data) {
              localStorage.setItem("utilisateur", JSON.stringify({
                ...JSON.parse(localStorage.getItem("utilisateur")),
                CodeClient: data.data.Code_client
              }))
              router.push('/')
              location.reload()
            }
            else
              error.value = `Aucun client ne correspond au n°${nClient.value}`
          });
          })
    }

    const controlled = ref(null)
    const user = JSON.parse(localStorage.getItem("utilisateur"))
    if (user.Admin && user.CodeClient){
      controlled.value = user.CodeClient
    }

    const dropControl = () => {
      localStorage.setItem("utilisateur", JSON.stringify({Identifiant: user.Identifiant, Admin: true}))
      location.reload()
    }

    return { nClient, takeControl, error, controlled, dropControl }
  }
}
</script>

<style lang="scss" scoped>
</style>