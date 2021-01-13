<template>
  Client: {{ no }}
  <div v-if="!modif">
    <p v-if="client">{{ client }}</p>
    <p v-else>Chargement...</p>
    <button @click="modif = !modif">Modifier</button>
  </div>
  <div v-else>
    <!-- TODO -->
    <form action="">
      inputs etc
    </form>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "Client",
  props: ["id"],
  setup (props) {
    document.title = `Client`
    const client = ref(null)

    const modif = ref (false)

    onMounted(() => {
      fetch("http://localhost:4040/client/" + props.id).then((response) => {
        response.json().then((data) => {
          client.value = data.data
          document.title = `Client - ${client.value.Nom}`
        });
      })
    })

    return { client, modif }
  }
}
</script>

<style scoped>

</style>