<template>
  <form onsubmit.prevent>
    <label>Rechercher: </label>
    <input type="text" v-model="nom" @input="load" />
    <label for="orderBy">Trier par</label>
    <select id="orderBy" v-model="tri" @change="load">
      <option value="">aucun tri</option>
      <option value="asc">points croissants</option>
      <option value="desc">points décroissant</option>
      <option value="nom">nom</option>
    </select>
  </form>

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
    const tri = ref("");

    const load = function () {
      let query = "http://localhost:4040/clients";
      if (nom.value) query += `?nom=${nom.value}`;
      if (tri.value !== "" ) query += `?orderBy=${tri.value}`
      fetch(query).then((response) => {
        response.json().then((data) => {
            clients.value = data.data});
      });
    };

    onMounted(() => {
      load();
    });

    return { clients, nom, load, tri };
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