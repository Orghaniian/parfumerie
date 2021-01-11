<template>
  <h2>Clients</h2>
  <label >Rechercher: </label>
  <input type="text" v-model="nom" @input="test" />
  <p>Resultat(s) pour: {{ nom }}</p>
  <div v-for="client in clients" :key="client.Code_client">
    <pre>{{ client }}</pre>
    <router-link :to="{ name: 'Client', params: { id: client.Code_client } } ">Voir</router-link>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "Clients",
  setup() {
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

<style>
</style>