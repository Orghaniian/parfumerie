<template>
  <form @submit.prevent="handleSubmit">
    <label for="login"></label>
    <input type="text" required v-model="login" name="login" id="login" autocomplete="on">
    <label for="password"></label>
    <input type="password" required v-model="password" name="password" id="password" autocomplete="on">
    <div >{{ error }}</div>
    <button>Se connecter</button>
  </form>
</template>

<script>
import {  ref } from "vue";
export default {
  name: "Connexion",
  setup () {
    // refs
    const login = ref("")
    const password = ref("")
    const error = ref(null)
    console.log("token: ", localStorage.getItem("token"))

    const handleSubmit = () => {
      error.value = null
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const options = {
        method: "POST",
        body: JSON.stringify({
          "Identifiant" : login.value,
          "Mot_De_Passe" : password.value
        }),
        headers: myHeaders
      }

      fetch("http://localhost:4040/authentification", options)
          .then((reponse) => {
            if(!reponse.ok){
              error.value = "Identifiants incorrects"
            }
            return reponse.json()
          }).then((data) => {
            console.log(data)
            if(!error.value){
              console.log("connecté!")
            }
          })

    }
    return { handleSubmit, password, login, error }
  }
}
</script>

<style scoped>

</style>