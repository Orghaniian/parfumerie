<template>
  Client: {{ no }}
  <p v-if="client">{{ client }}</p>
  <p v-else>Chargement...</p>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "Client",
  props: ["id"],
  setup (props) {
    const client = ref(null)

    onMounted(() => {
      fetch("http://localhost:4040/client/" + props.id).then((response) => {
        response.json().then((data) => (client.value = data.data));
      })
    })

    return { client }
  }
}
</script>

<style scoped>

</style>