<template>
  <h2>Connexion</h2>
  <form @submit.prevent="handleSubmit">
    <label for="login">Login: </label>
    <input type="text" required v-model="login" name="login" id="login" autocomplete="on">
    <label for="password">Mot de passe: </label>
    <input type="password" required v-model="password" name="password" id="password" autocomplete="on">
    <div >{{ error }}</div>
    <button class="btn">Se connecter</button>
  </form>
  <br/>
  <br/>
  <h3>Pas encore inscris ?</h3>
  <router-link  :to="{ name: 'Inscription' }">S'inscrire</router-link>
</template>

<script>
import {  ref } from "vue";
import { useRouter} from "vue-router"
export default {
  name: "Connexion",
  setup (props, context) {
    document.title = `Connexion`
    // refs
    const login = ref("")
    const password = ref("")
    const error = ref(null)

    const router = useRouter()

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
        if(!error.value ){
          console.log("connecté!")
          context.emit("login", {
            Identifiant : data.data.Identifiant,
            Admin: data.data.Admin === 1,
            CodeClient: data.data.Code_Client
          })
          router.push("/")
          location.reload()
        }
      })


    }
    return { handleSubmit, password, login, error }
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