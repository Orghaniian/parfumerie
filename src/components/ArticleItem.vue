<template>
    <div class="centre">
        <Card :img-src="article.image">
            <div class="desc">
                <div>
                <h4>{{ article.Nom }}</h4>
                <p>Article numero : {{ article.No_article }}</p>
                <p>{{ article.Prix_unitaire }} Points</p>
                <p>Disponible : {{ article.Disponible }}</p>
                <p>Echangeable : {{ article.Echangeable }}</p>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
import Card from "@/components/Card";
export default {
  name: "ArticleItem",
  components: {Card},
  props: {
    article: Object
  },
  setup () {
  }
}
</script>

<style lang="scss" scoped>

    .centre{
        display: block;
        margin-left: auto;
        margin-right: auto;    }

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

      h4{
         font-weight: bold;
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