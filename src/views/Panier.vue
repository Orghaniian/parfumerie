<template>
  <div v-for="(article, index) in panier" :key="article.no">
    <span>{{ article }}</span>
    <button @click="removeFromCart(index)">Retirer du panier</button>
  </div>
</template>

<script>
import useCart from "@/utils/useCart";

export default {
  name: "Panier",
  setup () {
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