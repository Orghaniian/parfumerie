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
    <button type="submit">Valider</button>
  </form>
  <p v-if="codeClientModifie">Client modifié ! n°{{ codeClientModifie }}</p>
</template>

<script>
import { ref,onMounted } from "vue";
export default {
  name: "ModifierClient",
  setup(props) {
    const form = ref({
        nom: "",
        facebook: "",
        instagram: "",
        email: "",
        telephone: ""
    })

    onMounted(() => {
      fetch("http://localhost:4040/client/" + props.id).then((response) => {
        response.json().then((data) => {
            form.value.nom = data.data.Nom
            console.log(props.id);
        });
      })
    })
    const codeClientModifie = ref(null)

    const handleSubmit = function () {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const options = {
            method: "PUT",
            body: JSON.stringify({ ...form.value }),
            headers: myHeaders
        }

        fetch("http://localhost:4040/client", options)
            .then((reponse) => reponse.json().then((data) => codeClientModifie.value = data.code_client))

        form.value = {
            nom: "",
            facebook: "",
            instagram: "",
            email: "",
            telephone: ""
        }
    };
    return { handleSubmit, form, codeClientModifie };
  }
}
</script>

<style>
</style>