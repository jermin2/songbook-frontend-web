import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

axios.defaults.xsrfHeaderName = 'x-csrftoken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true

// `timeout` specifies the number of milliseconds before the request times out.
// Because we enable Django Debug Toolbar for local development, there is often
// a processing hit. This can also be tremendously bad with unoptimized queries.
let defaultTimeout = 30000
if (process.env.PROD) {
  defaultTimeout = 10000
}
axios.defaults.baseURL = API_URL
axios.defaults.timeout = defaultTimeout


export default class SongWorker {

    fetchSongs() {
        const url = `${API_URL}/api/song/`;
        return axios.get(url).then(response => {
            return response.data }).catch(e => {throw e});
    }

    fetchSong(id) {
        const url = `${API_URL}/api/song/${id}`;
        return axios.get(url).then(response => {
            console.log("Fetched ", response.data)
            return response.data }).catch(e => {throw e});
    }


    updateSong(song){
        const url = `${API_URL}/api/song/${song.song_id}/`;
        const token = sessionStorage.getItem("token");
        const headers = { headers: {"Authorization": `Bearer ${token}`}, }

        return axios.put(url, song, headers).then(response => {
            return response.data
            }
             ).catch(e => {
                throw e;
            })
    }

    createSong(song){
        const url = `${API_URL}/api/song/`;
        const token = sessionStorage.getItem("token");
        const headers = { headers: {"Authorization": `Bearer ${token}`}, }
        return axios.post(url,song, headers).then(response => {
            return response.data;
        }
         ).catch(e => {
            throw e
        })
    }

    deleteSong(id){
        const url = `${API_URL}/api/song/${id}`;
        const token = sessionStorage.getItem("token");
        const headers = { headers: {"Authorization": `Bearer ${token}`}, }
        return axios.delete(url, headers).then(response => {
            return response.data
        }
         ).catch(e => {
            throw e
        });
    }

    getUpdate(){
        const url = `${API_URL}/api/update`;
        return axios.get(url).then(response => {
            return response.data
        }
         ).catch(e => {
            throw e
        });    
    }


}