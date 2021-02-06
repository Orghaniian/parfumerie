<template>
  <div class="card">
    <img :src="imgSrc" >
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
name: "BigCard",
  props: {
  imgSrc: String
  }
}
</script>

<style lang="scss" scoped >
.card{
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  padding: 15px;
  margin: 36px 20px;
  width: 600px;
  height: 300px;
  background: linear-gradient(180deg, #A79FDB 0%, rgba(159, 146, 237, 0.08) 100%);
  border-radius: 10px;
}
img{
  width: 200px;
  height: 200px;
  border-radius: 10px;
  align-self: center;
}
</style>