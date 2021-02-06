<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="nom">Nom</label>
      <input type="text" name="nom" id="nom" v-model="form.nom" required/>
    </div>
    <div>
      <label for="facebook">Facebook</label>
      <input type="text" name="facebook" id="facebook" v-model="form.facebook"/>
    </div>
    <div>
      <label for="instagram">Instagram</label>
      <input type="text" name="instagram" id="instagram" v-model="form.instagram"/>
    </div>
    <div>
      <label for="email">Email</label>
      <input type="text" name="email" id="email" v-model="form.email"/>
    </div>
    <div>
      <label for="telephone">Telephone</label>
      <input type="text" name="telephone" id="telephone" v-model="form.telephone"/>
    </div>
    <button class="btn" type="submit">Inscrire</button>
  </form>
  <p v-if="codeClientAjoute">Client inscrit ! n°{{ codeClientAjoute }}</p>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Inscrire",
  setup() {
    document.title = `Inscrire`
    const form = ref({
        nom: "",
        facebook: "",
        instagram: "",
        email: "",
        telephone: ""
    })

    const codeClientAjoute = ref(null)

    const handleSubmit = function () {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const options = {
            method: "POST",
            body: JSON.stringify({ ...form.value }),
            headers: myHeaders
        }

        fetch("http://localhost:4040/client", options)
            .then((reponse) => reponse.json().then((data) => codeClientAjoute.value = data.code_client))

        form.value = {
             nom: "",
            facebook: "",
            instagram: "",
            email: "",
            telephone: ""
        }
    };
    return { handleSubmit, form, codeClientAjoute };
  }
}
</script>

<style>

  .btn {
    height: 35px;
    padding: 4px 10px;
    background: #FFFFFF;
    border: 2px solid #483D8B;
    border-radius: 20px;
    text-decoration: none;
    line-height: 23px;
    justify-self: center;
    color: black;
    cursor: pointer;
    text-align: center;
}
</style>