const isConnected = () => {
    return localStorage.getItem("utilisateur") !== null && JSON.parse(localStorage.getItem("utilisateur")) !== null && JSON.parse(localStorage.getItem("utilisateur")).Identifiant !== null
}

export default isConnected