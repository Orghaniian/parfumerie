<template>
  <nav class="navbar">
    <ul>
      <li class="gauche"><span @click="logout" v-if="logged">Quitter</span><router-link :to="{ name: 'Connexion' }" v-else>Connexion</router-link></li>
      <li class="gauche"><router-link to="/">Accueil</router-link></li>
      <li>
        <div class="titre">
          <h1>Lalavande Fidelité</h1>
        </div>
      </li>
      <li class="droite">
        <router-link :to="{ name: 'Catalogue' }">Catalogue</router-link>
      </li>
      <li class="droite">
        <router-link :to="{ name: 'Ajouter' }">Ajouter</router-link>
      </li>
      <li class="droite"><router-link :to="{ name: 'Clients' }">Clients</router-link></li>
      <li class="droite">
        <router-link :to="{ name: 'Inscrire' }">Inscrire</router-link>
      </li>
      <li class="droite"><router-link to="/">Options</router-link></li>
    </ul>
  </nav>
</template>

<script>
import { useRouter } from "vue-router"
export default {
  props: {
    logged : Boolean
  },
  setup (props, context) {
    const router = useRouter()
    const logout = function (){
      context.emit("logout")
      router.push("/")
    }

    return { logout }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Rouge+Script");

.navbar {
  ul {
    display: flex;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: none;

    li {
      a {
        display: block;
        color: #a79fdb;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
      }
    }
  }

  .titre {
    border: purple solid;
    border-radius: 20px;
    padding: 0 20px;

    h1 {
      font-family: Rouge Script;
      font-size: 60px;
      font-weight: 400;
    }
  }
}
</style>