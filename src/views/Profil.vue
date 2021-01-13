<template>
  {{ infos }}
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "Profil",
  setup () {
    const infos = ref(null)

    onMounted(() => {
      fetch("http://localhost:4040/client/" + JSON.parse(localStorage.getItem("utilisateur")).CodeClient).then((response) => {
        response.json().then((data) => (infos.value = data.data));
      })
    })
    return { infos }
  }
}
</script>

<style scoped>

</style>