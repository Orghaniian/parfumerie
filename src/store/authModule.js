const authModule = {
    state: {
        utilisateur : null
    },
    getters: {
        utilisateur (state) {
            return state.utilisateur
        }
    },
    mutations: {
        SET_UTILISATEUR (state, value) {
            state.utilisateur = value
        }
    },
    actions: {
        async connexion ({ commit, state }, { login, password }){
            let error = null
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const options = {
                method: "POST",
                body: JSON.stringify({
                    "Identifiant" : login,
                    "Mot_De_Passe" : password
                }),
                headers: myHeaders
            }

            await fetch("http://localhost:4040/authentification", options)
                .then((reponse) => {
                    if(!reponse.ok){
                        error = "Identifiants incorrects"
                    }
                    return reponse.json()
                }).then((data) => {
                console.log(data)
                if(!error ){
                    commit("SET_UTILISATEUR", state, data.data)
                    console.log("connecté!", state.utilisateur)
                }
            })
        }
    }
}

export default authModule