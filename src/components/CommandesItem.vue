<template>
  <SmallCard>
    <div class="infos">
      <h4>Commande numéro : {{ commande.No_commande }}</h4>
      <p>Date: {{ commande.Date_commande }}</p>
      <router-link class="btn" style="text-align: center" :to="{ name: 'Commande', params: { id: commande.No_commande } } ">Voir plus</router-link>
    </div>
  </SmallCard>

</template>

<script>
import SmallCard from "@/components/SmallCard";
export default {
  name: "CommandesItem",
  components: {SmallCard},
  props: {
    commande: Object
  }
}
</script>

<style lang="scss" scoped>
.infos{
  display: grid;
  font-size: 1.25em;
  height: 100%;
  text-align: center;
}

h4 {
  font-weight: bold;
}
</style>