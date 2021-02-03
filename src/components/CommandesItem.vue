<template>
  <Card>
    <div class="infos">
      <h3>{{ commande.No_commande }}</h3>
      <p>Date: {{ commande.Date_commande }}</p>
      <router-link class="btn" style="text-align: center" :to="{ name: 'Commande', params: { id: commande.No_commande } } ">Consulter</router-link>
    </div>
  </Card>

</template>

<script>
import Card from "@/components/Card";
export default {
  name: "CommandesItem",
  components: {Card},
  props: {
    commande: Object
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