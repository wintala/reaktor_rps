
import axios from "axios"

const getHistoricalResults = (name) => {
  return axios.get(`/api/players/${name.replace(" ", "_")}`).then(response => response.data)
}

const getPlayerNames = () => {
  return axios.get("/api/playernames").then(response => response.data)
}

const syncDB = () => {
  return axios.get("/api/syncdb")
}

const exports = {getHistoricalResults, getPlayerNames, syncDB}

export default exports 

