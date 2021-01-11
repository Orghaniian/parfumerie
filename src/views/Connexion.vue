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
import {  ref, computed } from "vue";
import store from "@/store"
export default {
  name: "Connexion",
  setup () {
    // refs
    const login = ref("")
    const password = ref("")
    const error = ref(null)

    //vuex
    const utilisateur = computed(() => store.getters.utilisateur)
    console.log("store",  utilisateur.value ? utilisateur.value : utilisateur)

    const handleSubmit = () => {
      error.value = null
      store.dispatch('connexion', { login: login.value, password: password.value })
    }
    return { handleSubmit, password, login, error, utilisateur }
  }
}
</script>

<style scoped>

</style>