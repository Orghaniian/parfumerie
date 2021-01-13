<template>
  {{ infos }}
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "Profil",
  setup () {
    document.title = `Profil`
    const infos = ref(null)

    onMounted(() => {
      fetch("http://localhost:4040/client/" + JSON.parse(localStorage.getItem("utilisateur")).CodeClient).then((response) => {
        response.json().then((data) => {
          infos.value = data.data
          document.title = `Profil - ${infos.value.Nom}`
        });
      })
    })
    return { infos }
  }
}
</script>

<style scoped>

</style>