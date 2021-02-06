<template>
  Client: {{ no }}
  {{ client }}
  <div v-if="!modif">
    <div v-if="client">
      <div class="card-container">
          <ClientItem :client="client"/>
      </div>
    </div>
    <p v-else>Chargement...</p>
      <button class="btn" @click="modif = !modif">Modifier</button>
      <button class="btn" @click="fonctionSupp()">Supprimer</button>
  </div>


  <div v-else>
    <form @submit.prevent="handleSubmit">
    <div>
      <label for="nom">Nom</label>
      <input type="text" name="nom" id="nom" v-model="client.Nom" required/>
    </div>
    <div>
      <label for="facebook">Facebook</label>
      <input type="text" name="facebook" id="facebook" v-model="client.Facebook" required/>
    </div>
    <div>
      <label for="instagram">Instagram</label>
      <input type="text" name="instagram" id="instagram" v-model="client.Instagram" required/>
    </div>
    <div>
      <label for="email">Email</label>
      <input type="text" name="email" id="email" v-model="client.Email" required/>
    </div>
    <div>
      <label for="telephone">Telephone</label>
      <input type="text" name="telephone" id="telephone" v-model="client.Telephone" required/>
    </div>
    <button class="btn" type="submit">Valider</button>
  </form>
  <p v-if="codeClientModifie">Client modifié ! n°{{ codeClientModifie }}</p>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import ClientItem from "@/components/ClientItem";

export default {
  name: "Client",
  props: ["id"],
  components: {ClientItem},
  setup (props) {
    document.title = `Client`
    const client = ref(null)
    const modif = ref (false)
    const codeClientModifie = ref(null)
    const router = useRouter()

    const handleSubmit = function () {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const options = {
            method: "PUT",
            body: JSON.stringify({ ...client.value }),
            headers: myHeaders
        }

        fetch("http://localhost:4040/client/" + props.id, options)
            .then((reponse) => reponse.json().then((data) => {
              codeClientModifie.value = data.data
              document.title = `Client - ${client.value.Nom}`
              modif.value =false
            }))

      
    }

    onMounted(() => {
      fetch("http://localhost:4040/client/" + props.id)
      .then((response) => { response.json().then((data) => {
          client.value = data.data
          document.title = `Client - ${client.value.Nom}`
        });
      })
    })

    
    const fonctionSupp = function () {
        fetch(`http://localhost:4040/client/${props.id}`, { method: "DELETE" }).then( () => {
          router.push({name: "Clients"})
        })
    }
    
    

    return {  handleSubmit, fonctionSupp, client, modif, codeClientModifie }
  }
}
</script>


<style lang="scss" scoped>
  .clients{
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

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