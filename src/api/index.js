// Encargado de realizar los request al API de lastfm
import config from './config'
const {apiKey} = config
const URL = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`

export default function getArtists(country) {
    const url = URL.replace(':country', country)
    return fetch(url) 
        .then(res => res.json())
        .then(json => json.topartists.artist) //Devuelve la promesa obtenida de la api
}
//Nota: el fetch devuelve una promesa como resultados