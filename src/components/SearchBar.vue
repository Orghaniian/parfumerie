<template>
  <form @submit.prevent>
    <div class="input-container" @click="focusInput">
      <input ref="inputRef" class="searchBar" type="text" v-model="nom" @input="load" />
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.25 24.25L16.75 16.75L24.25 24.25ZM19.25 10.5C19.25 11.6491 19.0237 12.7869 18.5839 13.8485C18.1442 14.9101 17.4997 15.8747 16.6872 16.6872C15.8747 17.4997 14.9101 18.1442 13.8485 18.5839C12.7869 19.0237 11.6491 19.25 10.5 19.25C9.35093 19.25 8.21312 19.0237 7.15152 18.5839C6.08992 18.1442 5.12533 17.4997 4.31282 16.6872C3.5003 15.8747 2.85578 14.9101 2.41605 13.8485C1.97633 12.7869 1.75 11.6491 1.75 10.5C1.75 8.17936 2.67187 5.95376 4.31282 4.31282C5.95376 2.67187 8.17936 1.75 10.5 1.75C12.8206 1.75 15.0462 2.67187 16.6872 4.31282C18.3281 5.95376 19.25 8.17936 19.25 10.5Z" stroke="#483D8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div>
      <label for="orderBy">Trier par</label>
      <select id="orderBy" v-model="tri" @change="load">
        <option value="">aucun tri</option>
        <option value="asc">{{ selectOptions.asc }}</option>
        <option value="desc">{{ selectOptions.desc }}</option>
        <option value="nom">{{ selectOptions.nom }}</option>
      </select>
    </div>
  </form>

</template>

<script>
import {ref} from "vue";

export default {
  name: "SearchBar",
  props: {
    selectOptions: Object
  },
  setup (props, context) {
    const nom = ref("");
    const tri = ref("");

    const load = function (){
      context.emit("load", {nom: nom.value, tri: tri.value})
    }

    const inputRef = ref(null);
    const focusInput= function () {
      inputRef.value.focus()
    }

    return { load, tri, nom, inputRef, focusInput }
  }
}
</script>

<style scoped lang="scss">
form{
  margin-top: 8px;
  .input-container{
    display: inline-flex;
    align-items: center;
    width: 50%;
    margin-bottom: 15px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    min-width: 300px;
    height: 34px;
    box-sizing: border-box;
    padding: 0 10px;
    .searchBar{

      border: none;
      text-align: center;
      width: 100%;

    }
  }

  div:nth-child(2){
    text-align: left;
    margin-left: 40px;
    font-size: 1.5em;

    label{
      margin-right: 10px;

    }
  }
}


</style>