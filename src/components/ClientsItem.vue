<template>
  <BigCard img-src="https://www.nacdnet.org/wp-content/uploads/2016/06/person-placeholder.jpg">
    <div class="infos">
      <h3>{{ client.Nom ? client.Nom : "pas de Nom pas de cadeau!" }}</h3>
      <span>Code client:{{ client.Code_client }}</span>
      <p>Membership: {{ client.Categorie_membership_No_membership }}</p>
      <p>{{ client.Points }} points</p>
      <p>Telephone: {{ client.Telephone }}</p>
      <p>Email: {{ client.Email }}</p>
      <p>Facebook: {{ client.Facebook }}</p>
      <p>Instagram: {{ client.Instagram }}</p>
      <div>
      <br/><br/>
      <router-link class="btn" style="text-align: center" :to="{ name: 'Client', params: { id: client.Code_client } } ">Voir plus </router-link>
      </div>
    </div>
  </BigCard>

</template>

<script>
import BigCard from "@/components/BigCard";
export default {
  name: "ClientsItem",
  components: {BigCard},
  props: {
    client: Object
  }
}
</script>

<style scoped>
  h3{
    font-weight: bold;
  }

.infos{
  display: grid;
  font-size: 1.25em;
  height: 100%;
  text-align: left;
}
</style>