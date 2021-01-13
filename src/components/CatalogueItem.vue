<template>
  <div class="article">
    <img src="https://www.marionnaud.fr/medias/Eau-de-Parfum-101065090.jpg?context=bWFzdGVyfGZyb250L2V4dHJhem9vbXwxNDg2Nzl8aW1hZ2UvanBlZ3xmcm9udC9leHRyYXpvb20vaDEyL2g3OC8xMDE4ODg0NzIxODcxOC5qcGd8YmE1YTI3NDg4MGRkOTcxMWY0ZTFlNDk4YTU5MzM0OGY0ODhkYjg1NWEwZjRkMGQxODgwZDg0MzMxNWFmNjM5ZA" alt="">
    <div class="desc">
      <div>
        <h3>{{ article.Nom }}</h3>
        <p>{{ article.Prix_unitaire }} Points</p>
      </div>
      <router-link :to="{ name: 'Article', params: { no: article.No_article } } "><span>Consulter</span></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatalogueItem",
  props: {
    article: Object
  },
  setup () {
  }
}
</script>

<style lang="scss">
.article{
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  padding: 15px;
  margin: 36px 20px;
  width: 400px;
  height: 190px;
  background: linear-gradient(180deg, #A79FDB 0%, rgba(159, 146, 237, 0.08) 100%);
  border-radius: 10px;

  .desc{
    display: grid;
    grid-auto-rows: 1fr 20%;
    font-size: 1.25em;
    position: relative;

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

    a{
      width: 90px;
      height: 23px;
      padding: 4px 10px;
      background: #FFFFFF;
      border: 2px solid #483D8B;
      border-radius: 20px;
      text-decoration: none;
      line-height: 23px; // centre verticalement
      justify-self: center;
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