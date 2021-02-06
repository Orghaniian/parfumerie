<template>

<router-link class="btn" :to="{ name: 'Inscrire' }">Inscrire un client</router-link>

  <SearchBar @load="load" :select-options="{
    asc: 'code croissant',
    desc: 'code decroissant',
    nom: 'nom'
  }"/>

  <p>{{ clients.length }} Resultat(s) pour: {{ nomRef }}</p>
  <div class="card-container">
    <div v-for="client in clients" :key="client.Code_client">
      <ClientsItem :client="client"/>
    </div>
  </div>

</template>

<script>
import { onMounted, ref } from "vue";
import ClientsItem from "@/components/ClientsItem";
import SearchBar from "@/components/SearchBar";
export default {
  name: "Clients",
  components: {SearchBar, ClientsItem},
  setup() {
    document.title = `Clients`
    const clients = ref([]);
    const nomRef = ref("")

    const load = function (e = {}) {
      const { tri, nom } = e
      nomRef.value = nom
      let query = "http://localhost:4040/clients";
      if (nom && nom !== "" ) query += `?nom=${nom}`;
      if (tri && tri !== "" ) query += `?orderBy=${tri}`
      fetch(query).then((response) => {
        response.json().then((data) => {
            clients.value = data.data});
      });
    };

    onMounted(() => {
      load();
    });

    return { clients, load, nomRef };
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