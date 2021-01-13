<template>
  <div class="card">
    <slot name="img"/>
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
name: "Card"
}
</script>

<style lang="scss">
.card{
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  padding: 15px;
  margin: 36px 20px;
  width: 400px;
  height: 190px;
  background: linear-gradient(180deg, #A79FDB 0%, rgba(159, 146, 237, 0.08) 100%);
  border-radius: 10px;
}
img{
  width: 160px;
  height: 160px;
  border-radius: 10px;
  align-self: center;
}
</style>