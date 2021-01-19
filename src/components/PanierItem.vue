<template>
  <Card img-src="https://www.marionnaud.fr/medias/Eau-de-Parfum-101065090.jpg?context=bWFzdGVyfGZyb250L2V4dHJhem9vbXwxNDg2Nzl8aW1hZ2UvanBlZ3xmcm9udC9leHRyYXpvb20vaDEyL2g3OC8xMDE4ODg0NzIxODcxOC5qcGd8YmE1YTI3NDg4MGRkOTcxMWY0ZTFlNDk4YTU5MzM0OGY0ODhkYjg1NWEwZjRkMGQxODgwZDg0MzMxNWFmNjM5ZA">
    <div class="desc-panier">
      <div>
        <div class="infos">
          <h3>{{ articleInfos.Nom }}</h3>
          <p>Prix (unité) : {{ articleInfos.Prix_unitaire }} Points</p>
        </div>
        <p>Quantité: {{ article.quantite }}</p>
      </div>
      <button class="btn" @click="remove(index)">Retirer du panier</button>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
import {onMounted, ref} from "vue";
export default {
  name: "PanierItem",
  components: {Card},
  props: {
    article: Object,
    index: Number
  },
  setup (props, context) {
    const articleInfos = ref({});
    const remove = function (index){
      context.emit("remove", index)
    }

    const load = function () {
      let query = `http://localhost:4040/article/${props.article.no}`;
      fetch(query).then((response) => {
        response.json().then((data) => (articleInfos.value = data.data));
      });
    };

    onMounted(() => {
      load();
    });

    return { remove, articleInfos }
  }
}
</script>

<style lang="scss">
.desc-panier{
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

    .infos::after{
      content: "";
      position: absolute;
      top: 45%;
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