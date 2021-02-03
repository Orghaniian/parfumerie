<template>
  <div>
    {{ infos }}
  </div>
  <h3>Historique des commandes</h3>
  <div v-for="commande in commandes" :key="commande.No_commande">
    {{ commande }}
  </div>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "Profil",
  setup () {
    document.title = `Profil`
    const infos = ref(null)
    const commandes = ref(null)

    onMounted(() => {
      fetch("http://localhost:4040/client/" + JSON.parse(localStorage.getItem("utilisateur")).CodeClient).then((response) => {
        response.json().then((data) => {
          infos.value = data.data
          document.title = `Profil - ${infos.value.Nom}`
          fetch(`http://localhost:4040/commandes/client/${infos.value.Code_client}`).then(response => response.json().then(data => {
            commandes.value = data.data
          }))
        });
      })

    })
    return { infos, commandes }
  }
}
</script>

<style scoped>

</style>