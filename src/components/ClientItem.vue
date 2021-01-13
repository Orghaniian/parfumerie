<template>
  <Card img-src="https://www.nacdnet.org/wp-content/uploads/2016/06/person-placeholder.jpg">
    <div class="infos">
      <h3>{{ client.Nom }}</h3>
      <p>Membership: {{ client.Categorie_membership_No_membership }}</p>
      <p>{{ client.Points }} points</p>
      <router-link :to="{ name: 'Client', params: { id: client.Code_client } } ">Voir plus</router-link>
    </div>
  </Card>

</template>

<script>
import Card from "@/components/Card";
export default {
  name: "ClientItem",
  components: {Card},
  props: {
    client: Object
  }
}
</script>

<style scoped>
.infos{
  display: grid;
  font-size: 1.25em;
  height: 100%;
  text-align: left;
}
</style>