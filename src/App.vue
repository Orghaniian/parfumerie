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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
