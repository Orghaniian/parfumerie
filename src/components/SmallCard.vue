<template>
  <div class="card">
      <slot/>
  </div>
</template>

<script>
export default {
name: "SmallCard",
  props: {
  imgSrc: String
  }
}
</script>

<style lang="scss" scoped>
.card{
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  padding: 15px;
  margin: 36px 20px;
  width: 250px;
  height: 150px;
  background: linear-gradient(180deg, #A79FDB 0%, rgba(159, 146, 237, 0.08) 100%);
  border-radius: 10px;
  text-align: center;
}

</style>