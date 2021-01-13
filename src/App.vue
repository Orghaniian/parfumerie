<template>
  <Menu @logout="logout" :logged="logged"/>
  <div>{{ utilisateur }}</div>
  <router-view @login="login"/>
</template>

<script>
import Menu from "@/components/Menu";
import { ref, computed } from "vue"
export default {
  components: { Menu },
  setup () {
    const utilisateur = ref(null)
    const loadUtilisateur = () => {
      if(localStorage.getItem("utilisateur")){
        utilisateur.value = JSON.parse(localStorage.getItem("utilisateur"))
      }
    }

    loadUtilisateur()
    const logged = computed(() => {
      return utilisateur.value !== null
    })

    const login = function (e){
      utilisateur.value = e;
      localStorage.setItem("utilisateur", JSON.stringify(utilisateur.value))
    }

    const logout = function (){
      localStorage.setItem("utilisateur", null)
      loadUtilisateur()
    }
    return { login, logout, utilisateur, logged }
  }
};
</script>
