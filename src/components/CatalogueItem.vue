<template>
  <Card :img-src="article.image">
      <div class="desc">
        <div>
          <h3>{{ article.Nom }}</h3>
          <p>{{ article.Prix_unitaire }} Points</p>
        </div>
        <router-link class="btn" :to="{ name: 'Article', params: { no: article.No_article } } "><span>Consulter</span></router-link>
      </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
export default {
  name: "CatalogueItem",
  components: {Card},
  props: {
    article: Object
  },
  setup () {
  }
}
</script>

<style lang="scss">
  .desc{
    display: grid;
    grid-template-rows: 1fr 20%;
    font-size: 1.25em;
    position: relative;
    height: 100%;

    div{
      display: grid;
      grid-template-rows: 1fr 1fr;
      p{
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h3::after{
        content: "";
        position: absolute;
        top: 35%;
        height: 1px;
        width: 90%;
        left: 4%;
        background-color: black;
      }
    }
  img{
    width: 160px;
    height: 160px;
    border-radius: 10px;
    align-self: center;
  }


}
</style>