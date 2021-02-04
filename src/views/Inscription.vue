<template>
  {{ password }}
  {{ confirmPassword }}
  {{ password === confirmPassword}}
  <form @submit.prevent="handleSubmit">
    <label for="login">Login: </label>
    <input type="text" required v-model="login" name="login" id="login" autocomplete="on">
    <label for="password">Mot de passe: </label>
    <input type="password" required v-model="password" name="password" id="password" autocomplete="on">
    <label for="confirmPassword">Confirmez votre mot de passe: </label>
    <input type="password" required v-model="confirmPassword" name="confirmPassword" id="confirmPassword" autocomplete="on">
    <label for="code">Code client: </label>
    <input type="text" required v-model="code" name="code" id="code" autocomplete="on">
    <div >{{ error }}</div>
    <button>Se connecter</button>
  </form>
  <h3>Déjà inscris ?</h3>
  <router-link :to="{ name: 'Connexion' }">Se connecter</router-link>
</template>

<script>
import {ref, watch} from "vue";

export default {
  name: "Inscription",
  setup(){
    document.title = `Inscription`

    const error = ref(null)

    const login = ref("")
    const password = ref("")
    const confirmPassword = ref("")
    const code = ref("")

    watch([ password, confirmPassword ], () => {
      if (password.value !== confirmPassword.value && confirmPassword.value !== ""){
        console.log(confirmPassword.value !== "")
        error.value = "Confirmation incorrect, veuillez entrer deux fois le même mot de passe !"
      }else{
        error.value = null
      }
    })

    const handleSubmit= () => {
      error.value = null
      if (password.value !== confirmPassword.value){
        //TODO route d'inscription dans l'api
      }else{
        error.value = "Confirmation incorrect, veuillez entrer deux fois le même mot de passe !"
      }
    }

    return { error, handleSubmit, login, password, confirmPassword, code }
  }
}
</script>

<style scoped>
form{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>