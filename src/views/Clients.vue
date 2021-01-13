<template>
  <h2>Clients</h2>
  <label >Rechercher: </label>
  <input type="text" v-model="nom" @input="test" />

  <p>Resultat(s) pour: {{ nom }}</p>
  <div class="card-container">
    <div v-for="client in clients" :key="client.Code_client">
      <ClientItem :client="client"/>
    </div>
  </div>

</template>

<script>
import { onMounted, ref } from "vue";
import ClientItem from "@/components/ClientItem";
export default {
  name: "Clients",
  components: {ClientItem},
  setup() {
    document.title = `Clients`
    const clients = ref([]);
    const nom = ref("");

    const load = function () {
      let query = "http://localhost:4040/clients";
      if (nom.value) query += `?nom=${nom.value}`;
      fetch(query).then((response) => {
        response.json().then((data) => {
            clients.value = data.data});
      });
    };

    const test = function () {
      load();
    };

    onMounted(() => {
      load();
    });

    return { clients, nom, test };
  },
};
</script>

<style lang="scss">
.clients{
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>