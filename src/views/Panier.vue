<template>
  <div class="card-container">
    <div v-for="(article, index) in panier" :key="article.no">
      <PanierItem :article="article" :index="index" @remove="removeFromCart"/>
    </div>
  </div>
  <div class="btn" style="width: 180px;margin: auto">Passer la commande</div>

</template>

<script>
import useCart from "@/utils/useCart";
import PanierItem from "@/components/PanierItem";

export default {
  name: "Panier",
  components: {PanierItem},
  setup () {
    document.title = `Panier`
    const { panier, setCart } = useCart()

    const removeFromCart = function (index){
      panier.value.splice(index, 1)
      setCart(panier.value)
    }

    return { panier, removeFromCart }
  }
}
</script>

<style scoped>

</style>